/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 */
Ext.define('jskit.controller.main', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',

    routeHistory: [],

    listen: {
        controller: {
            '*': {
                // login: 'onLogin',
                // logout: 'onLogout',
                unmatchedroute: 'handleUnmatchedRoute'
            }
        },
        global: {
            'launch': 'launch',
            'init-firebase': 'onInitializeApp',
            'firebase-auth-error': 'log',
            'firebase-auth-loggedin': 'log',
            'firebase-auth-loggedout': 'log',
            'firebase-auth-statechange': 'authState',
            'exception': 'log'
        }
    },
    routes: {
        '*': 'handleWildCardRoute',
        'login': {
            before: 'onBeforeHandleLoginRoute',
            action: 'handleLoginRoute'
        }
    },

    doInit: function () {

        Ext.ariaWarn = Ext.emptyFn;

        Ext.Initialized = (firebase.apps.length !== 0);

        Ext.SaltKey = md5(Ext.manifest.id + Ext.browser.identity);

        config = jskit.Globals.decrypt(localStorage.getItem('config'), Ext.SaltKey) || {};

        Ext.JsKitData = jskit.Globals.decrypt(localStorage.getItem('JsKitGeoData'), Ext.SaltKey) || {};

        !Ext.Initialized && Ext.fireEvent('init-firebase');

        window.addEventListener('beforeunload', jskit.Globals.onBeforeUnload);

    },


    onLaunch: function () {

    },

    launch: function () {

        if (theme) {
            Ext.util.CSS.swapStyleSheet(theme, 'resources/' + theme + '/' + theme + '-all_1.css');
        }
        Ext.prevMinimizedWindow = null;
        Ext.activeWindows = [];
    },

    finishInit: function () {

    },

    onInitializeApp: function () {
        let me = this;
        if (!Ext.Object.isEmpty(config)) {
            me.doInitializeApp(config);
        } else {
            me.doInitializeApp(jskit.Globals.decrypt(initConfig, ''));
        }
    },

    doInitializeApp: function (o) {
        firebase.initializeApp(o);
        Ext.DB_URL = o.databaseURL;
        Ext.db = firebase.database();
        Ext.st = firebase.storage();
        Ext.currentUser = JSON.parse(sessionStorage.getItem('user') || '{}');
        Ext.Initialized = true;
    },


    onProjectListChange: function (combo, value) {
        let wind = combo.up('window'),
            mainPort = Ext.getBody().component,
            mainFooter = mainPort.down('mainfooter'),
            vm = mainPort.getViewModel(),
            projectName = vm.get('projectName');

        if (Ext.JsKitData.projectName !== value) {
            wind.down('textarea')
                .setValue(JSON.stringify(combo.selection.data));
            mainFooter.events.boxready.fire(mainFooter);
            Ext.JsKitData.projectName = value;
            vm.set('jsKit', Ext.JsKitData);
        }
    },

    translaionComboAfterRender: function (combo) {
        combo.store.proxy.setData(jskit.Globals.translationsStore());
        combo.store.load();
    },

    onLanguageChange: function (combo, value) {
        let me = this,
            vm = me.getViewModel(),
            mainmenu = jskit.Globals.compQuery('mainmenu'),
            store = mainmenu.getStore();

        offlineSettings.lang = value.toLowerCase();

        localStorage.removeItem('currLang');
        window.getLocalTranslationFile(offlineSettings.lang)
            .then(file => {
                jskitTranslations = file;
                location.hostname !== 'localhost' && localStorage.setItem('currLang', JSON.stringify(jskitTranslations));
                vm.set('translations', jskitTranslations);
                combo.store.proxy.setData([]);
                combo.events.afterrender.fire(combo);
                store.getRootNode()
                    .removeAll();
                store.setRootNode({
                    expanded: true,
                    defaultRootProperty: 'data',
                    data: jskit.MenuDataCtrl.dataRoot()
                });
            });

    },

    onNavigationItemClick: function (tree, node, e) {
        let me = this,
            to = node.node,
            mainPort = tree.up(),
            mainTab = mainPort.down('app-maintabs');
        if (to && node.node.isLeaf()) {
            try {
                me.beforeCreateView(to)
                    .then(() => {
                        me.doCreateView(to)
                            .then((newView) => {
                                mainTab.add(newView);
                                mainTab.setActiveTab(newView);
                            });
                    });
            } catch (e) {
                console.log(e);
            }
        } else {
            node.item.toggleExpanded();
        }
        Ext.resumeLayouts(tree);
    },

    beforeCreateView: function (node) {
        // TODO load the package .

        let pkg = node.get('viewType'),
            deffered = new Ext.Deferred();

        if (!pkg || Ext.Package.isLoaded(pkg)) {
            deffered.resolve()
        } else {
            Ext.Package.load(pkg).then(() => {
                deffered.resolve()
            });
        }
        return deffered.promise;
    },

    doCreateView: function (node) {
        let me = this,
            deffered = new Ext.Deferred();
        deffered.resolve(Ext.create({
            xtype: node.get('viewType'),
            title: node.get('text'),
            iconCls: node.get('iconCls')
        }));

        return deffered.promise;
    },

    toggleMenu: function () {
        let mainPort = Ext.getBody().component,
            mianHeader = mainPort.down('mainheader'),
            mainMenu = mainPort.down('mainmenu'),
            zoomItem = mainPort.down('#zoomItem');
        if (mainPort.items.length === 4) {
            mainMenu.destroy();
            mianHeader.destroy();
            zoomItem.setHtml('<b>Exit Zoom</b>');
        } else {
            mainPort.add([{
                xtype: 'mainmenu',
                region: 'west'
            }, {
                xtype: 'mainheader',
                region: 'north'
            }]);
            zoomItem.setHtml('');
        }

    },

    onMainPortResize: function (self, width, height, oldWidth, oldHeight, eOpts) {
        let me = this,
            vm = me.getViewModel();
        vm.set('jsKit', Ext.JsKitData);
    },

    renderLoginWindow: function () {
        Ext.Initialized && Ext.create('jskit.view.component.LoginWindow');
        !Ext.Initialized && Ext.toast('Initialize Firebase ..', 'Alert ');
    },

    log: function (args) {
        Ext.Msg.alert('Alert', args);
    },

    onProfilePictUpload: function (field, value) {
        let me = this, //on going ...
            viewList = me.view,
            files = field.el.down('input[type=file]').dom.files,
            container = field.up(),
            wind = field.up('window'),
            currRec = wind.getViewModel()
            .get('record');
        wind.storageUrls = 'imageUrls';
        wind.storageUrl = 'imageUrl';
        jskit.Globals.prepareFiles(files, wind, currRec, container);

    },

    onMainPortRender: function () {
        let me = this;
        !Ext.Object.isEmpty(config) && me.doInitializeApp();
    },

    onProfileClick: function () {
        Ext.widget('profilewindow', {
            itemId: 'profilewindow'
        });
    },

    onMinportBeforeRender: function () {
        let me = this;
        !Ext.Initialized && Ext.fireEvent('init-firebase');
        me.initLanguage();
    },

    initLanguage: function () {
        let me = this;

        me.getViewModel()
            .set('translations', jskitTranslations);
    },

    initializeApp: function (btn) {
        let me = this,
            wind = btn.up('window');
        config = eval('(' + me.getViewModel()
            .getData().config + ')');
        localStorage.setItem('config', jskit.Globals.encrypt(config, Ext.SaltKey));
        wind.destroy();
        me.doLogout();
        firebase.app()
            .delete()
            .then(function () {
                Ext.fireEvent('init-firebase');
            });

    },

    onBeforeHeaderRender: function () {
        Ext.Initialized && firebase.auth()
            .onAuthStateChanged(function (user) {
                if (user) {
                    Ext.GlobalEvents.fireEvent('firebase-auth-statechange', user);
                } else {
                    Ext.GlobalEvents.fireEvent('firebase-auth-statechange', false);
                }
            });
    },

    onAfterHeaderRender: function (header) {
        let me = this,
            loginBtn = header.down('#loginBtn'),
            logoutBtn = header.down('#logOutBtn'),
            imageEl = header.down('image'),
            photoUrl = 'resources/img/guest.png';

        if (!Ext.Object.isEmpty(Ext.currentUser)) {
            loginBtn.setHidden(true);
            logoutBtn.setHidden(false);
            photoUrl = Ext.currentUser.photoURL || 'http://www.gravatar.com/avatar/' + md5(Ext.currentUser.email) + '?d=identicon';
        } else {
            logoutBtn.setHidden(true);
            loginBtn.setHidden(false);
        }
        imageEl.setSrc(photoUrl);
        me.installHome();
    },

    authState: function (state) {

        var me = this,
            header = Ext.getBody()
            .component
            .down('mainheader');
        header.events
            .afterrender
            .fire(header);

        if (state) {
            Ext.currentUser = firebase.auth().currentUser;
        } else {
            Ext.currentUser = {};
            me.redirectTo('', {
                replace: true
            });
        }
        return false;
    },

    installHome: function () {
        let deferredPrompt;
        const addBtn = Ext.ComponentQuery.query('#install-button')[0];
        addBtn.setStyle('display', 'none');

        window.addEventListener('beforeinstallprompt', (e) => {
            // Prevent Chrome 67 and earlier from automatically showing the prompt
            e.preventDefault();
            // Stash the event so it can be triggered later.
            deferredPrompt = e;
            // Update UI to notify the user they can add to home screen
            addBtn.setStyle('display', 'block');

            addBtn.addEventListener('click', (e) => {
                // hide our user interface that shows our A2HS button
                addBtn.setStyle('display', 'none');
                // Show the prompt
                deferredPrompt.prompt();
                // Wait for the user to respond to the prompt
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                    deferredPrompt = null;
                });
            });
        });

    },


    handleWildCardRoute: function () {

        document.title = 'JsKit | ' + Ext.History.getToken();
    },

    onBeforeHandleLoginRoute: function (action) {
        if (!Ext.Object.isEmpty(Ext.currentUser)) {
            this.redirectTo('', {
                replace: true
            });
            action.stop();
        } else {
            action.resume();
        }

    },

    handleLoginRoute: function () {
        Ext.Package.load('jsAuth').then(() => {
            Ext.widget('authlogin');
        });

    },

    showMain: function () {
        Ext.Package.load('base').then(() => {
            Ext.widget('app-mainport');
            Ext.Object.isEmpty(Ext.JsKitData) && jskit.Globals.getLoc();
            navigator.geolocation.getCurrentPosition(jskit.Globals.onGeolocation, jskit.Globals.onGeoError
                // {
                //     maximumAge: Infinity,
                //     timeout: 0
                // }
            );

            Ext.GlobalEvents.fireEvent('firebase-auth-statechange', Ext.currentUser);
        });

    },

    handleUnmatchedRoute: function (route) {

        var me = this;

        if (Ext.Object.isEmpty(Ext.currentUser)) {
            // There is no authenticated user, let's redirect to the login page but keep track
            // of the original route to restore the requested route after user authentication.
            me.originalRoute = route;

            me.redirectTo('login', {
                replace: true
            });
            return;
        }

        // There is an authenticated user, so let's simply redirect to the default token.

        me.redirectTo(me.originalRoute || 'home', {
            replace: true
        });
        me.showMain();

    }

});