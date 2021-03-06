var Note = React.createClass({
    displayName: 'Note',
    
    getInitialState: function () {
        return { editing: false };
    },
    componentWillMount: function () {
        this.style = {
            right: this.randomBetween(0, window.innerWidth - 150) + 'px',
            top: this.randomBetween(0, window.innerHeight - 150) + 'px',
            transform: 'rotate(' + this.randomBetween(-15, 15) + 'deg)'
        };
    },
    componentDidMount: function () {
        $(this.getDOMNode()).draggable();
        console.log(this.state.notes);
    },
    randomBetween: function (min, max) {
        return min + Math.ceil(Math.random() * max);
    },
    edit: function () {
        this.setState({ editing: true });
    },
    save: function () {
        this.props.onChange(this.refs.newText.getDOMNode().value, this.props.index);
        var newnote = {
            id:this.props.index,
            note:this.refs.newText.getDOMNode().value
        };
        var dbnotes = firebase.database().ref().child('notes');
        dbnotes.child(this.props.index).set(newnote);
        this.setState({ editing: false });
    },
    remove: function () {
        this.props.onRemove(this.props.index);
    },
    renderDisplay: function () {
        return React.createElement(
            'div',
            { className: 'note', style: this.style },
            React.createElement(
                'p',
                null,
                this.props.children
            ),
            React.createElement(
                'span',
                null,
                React.createElement('button', { onClick: this.edit,
                    className: 'btn btn-sm btn-primary glyphicon glyphicon-pencil' }),
                React.createElement('button', { onClick: this.remove,
                    className: 'btn btn-sm btn-danger glyphicon glyphicon-trash' })
            )
        );
    },
    // componentWillReceiveProps:function(nextProps){
    //     var color = this.props.colors.split(', ')[nextProps.colorIndex];
    //     if(!color){ this.setProps({colorIndex:0})}
    //     this.setState ({backgroundColor : color});
    // },
    renderForm: function () {
        return React.createElement(
            'div',
            { className: 'note', style: this.style },
            React.createElement('textarea', { ref: 'newText', defaultValue: this.props.children,
                className: 'form-control' }),
            React.createElement('button', { onClick: this.save, className: 'btn btn-success btn-sm glyphicon glyphicon-floppy-disk' })
        );
    },
    render: function () {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderDisplay();
        }
    }
});

var Board = React.createClass({
    displayName: 'Board',
    
    propTypes: {
        count: function (props, propName) {
            if (typeof props[propName] !== "number") {
                return new Error('The count property must be a number');
            }
            if (props[propName] > 100) {
                return new Error("Creating " + props[propName] + " notes is ridiculous");
            }
        }
    },
    getInitialState: function () {
        return {
            notes: []
        };
    },
    nextId: function () {
        this.uniqueId = this.uniqueId || 0;
        return this.uniqueId++;
    },
    componentWillMount: function () {
        var self = this;
        if (this.props.count) {
            const root = firebase.database().ref().child('notes');
            root.on('value', snap => {
                var Notes = snap.val();
                Array.prototype.forEach.call(Notes, note => {
                    console.log(note);
                    self.add(note.note);
                });
            });
        }
    },
    
    add: function (text) {
        console.log(this.state.notes);
        var arr = this.state.notes;
        var newNote = {
            id: this.nextId(),
            note: text
        };
        arr.push(newNote);
        this.setState({ notes: arr });
        
    },
    update: function (newText, i) {
        var arr = this.state.notes;
        arr[i].note = newText;
        this.setState({ notes: arr });
        
    },
    remove: function (i) {
        var arr = this.state.notes;
        arr.splice(i, 1);
        this.setState({ notes: arr });
    },
    eachNote: function (note, i) {
        return React.createElement(
            Note,
            { key: note.id,
                index: i,
                onChange: this.update,
                onRemove: this.remove
            },
            note.note
        );
    },
    render: function () {
        return React.createElement(
            'div',
            { className: 'board' },
            this.state.notes.map(this.eachNote),
            React.createElement('button', { className: 'btn btn-sm btn-success glyphicon glyphicon-plus',
                onClick: this.add.bind(null, "New Note") })
        );
    }
});

React.render(React.createElement(Board, { colors: 'Red,Green,Purple,DarkMageta,Salmon,Chartreuse', count: 50 }), document.getElementById('react-container'));