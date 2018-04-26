(function UMD(rootScope, factory) {
    if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        window.createApp = factory;
    }
})(this, function IIFE({ Component, createElement: h }) {
    function createColumns({ isHeader, firstCellValue, query, rowIndex, vowels, convert }) {
        const el = (isHeader) ? 'th' : 'td';

        const columns = vowels.map((vowel, index) => {
            const value = (isNaN(query)) ? convert(query) : query;

            let numberString = String(value);
            if (numberString.length % 2 === 1) {
                numberString = '0' + numberString;
            }
            const splittedNumberString = numberString.split('');
            const numbers = [];
            splittedNumberString.forEach((number, idx) => {
                if (idx % 2 === 0) {
                    numbers.push(parseInt(number + splittedNumberString[idx + 1], 10));
                }
            });

            const cellValue = (index + (rowIndex * vowels.length));

            return h(el, {
                className: (numbers.includes(cellValue)) ? 'on' : '',
                key: vowel + '-' + index,
            }, (isHeader) ? vowel : cellValue);
        });

        columns.unshift(h('th', {
            key: 0,
        }, firstCellValue));

        return columns;
    }

    function Thead(props) {
        return h('thead', {}, h('tr', {}, createColumns(Object.assign({}, props, {
            firstCellValue: '',
            isHeader: true,
            rowIndex: 0,
        }))));
    }

    function Tbody(props) {
        const rows = props.consonants.map((consonant, index) => h('tr', {
            key: consonant + '-' + index,
        }, createColumns(Object.assign({}, props, {
            firstCellValue: consonant,
            isHeader: false,
            rowIndex: index,
        }))));

        return h('tbody', {}, rows);
    }

    function Table(props) {
        // return h('table', {}, h(Thead, props), h(Tbody, props));

        return (
            <table>
                <Thead props={props} />
                <Tbody props={props} />
            </table>
        );
    }

    function Form({ handleChange, query, convert }) {
        const input = h('input', {
            onChange: handleChange,
            value: query,
        });
        const output = h('output', {}, convert(query));

        return h('form', {}, input, output);
    }

    class App extends Component {
        constructor(props) {
            super(props);

            this.state = {
                query: '',
            };

            this.handleChange = this.handleChange.bind(this);
        }

        handleChange(evt) {
            this.setState({
                query: evt.target.value,
            });
        }

        render() {
            return h(
                'div', {},
                h(Form, Object.assign({}, this.props, {
                    handleChange: this.handleChange,
                    query: this.state.query,
                })),
                h(Table, Object.assign({}, this.props, {
                    query: this.state.query,
                }))
            );
        }
    }

    return App;
});
