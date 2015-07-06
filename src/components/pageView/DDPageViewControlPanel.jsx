const React = require("react");

const {
  Row, Col,
  Input,
  Well, Button
} = require("react-bootstrap");

let Fluxxor = require("fluxxor");
let FluxMixin = Fluxxor.FluxMixin(React);

let DDPageViewControlPanel = React.createClass({
  mixins: [FluxMixin],
  displayName: "DDPageViewControlPanel",
  propTypes: {
    statInfo: React.PropTypes.object,
  },
  render: function() {

    return (
      <div>
      <Well>
          <code>Select ("") Group By {this.props.statInfo.humanName}</code>
          <code>Where 訂單金額 > </code>
      </Well>
          <form className='form-horizontal'>

            <Row>
              <Col xs={6}>
                 <Input label='Measurement' labelClassName='col-xs-4' wrapperClassName='col-xs-8'
                        type='select' placeholder='select chart type'>
                  <option value='select'>序號(PK)</option>
                  <option value='pie'>訂單金額</option>
                  <option value='line'>子女數</option>
                </Input>
              </Col>
              <Col xs={6}>
                <Input wrapperClassName='col-xs-10'
                        type='select' placeholder='select chart type'>
                  <option value='select'>Distinct Count</option>
                  <option value='pie'>Average</option>
                  <option value='line'>Sum</option>
                </Input>
              </Col>
            </Row>


            <Row>
              <Col xs={2}>
                <b>Filters</b>
                <a href={"#"}>
                  <i className={"fa fa-plus fa-fw"}></i>
                </a>
              </Col>
              <Col xs={4}>
                <Input  wrapperClassName='col-xs-12'
                        type='select' placeholder='select chart type'>
                  <option value='pie'>訂單金額</option>
                  <option value='line'>子女數</option>
                </Input>
              </Col>
              <Col xs={2}>
                <Input
                        type='select' placeholder='select chart type'>
                  <option value='pie'> {">"} </option>
                  <option value='line'> {"<"} </option>
                  <option value='select'> eq.</option>
                  <option value='line'> not eq. </option>
                </Input>
              </Col>
              <Col xs={3}>
                <input type='text' className='form-control' />
              </Col>
              <Col xs={1}>
                <a href={"#"}>
                  <i className={"fa fa-times fa-fw"}></i>
                </a>
              </Col>
            </Row>
            <Button bsStyle={"primary"} className={"pull-right"}><i className={"fa fa-play fa-fw"}></i> Run</Button>
          </form>
          </div>

    );


  }
});

module.exports = DDPageViewControlPanel;
