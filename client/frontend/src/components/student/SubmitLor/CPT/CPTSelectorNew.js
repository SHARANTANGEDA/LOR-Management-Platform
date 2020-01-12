import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import CoursesDone from "./CoursesDone";
import ProjectsDone from "./ProjectsDone";
import ThesisDone from "./ThesisDone";
import TextAreaFieldGroup from "../../../common/TextAreaGroupField";

class CPTSelectorNew extends Component {
	constructor() {
		super();
		this.state = {
			courses: [],
			projects: [],
			thesis: [],
			status: false,
			others: '',
			errors: {},
			strengths: '',
			comments: '',
			showOthers: false,
			toggler1: false,
			toggler2: false
		};
		this.changeHandler = this.changeHandler.bind(this);
		// this.onSubmit = this.onSubmit.bind(this);
		this.codeSelect = this.codeSelect.bind(this);
		this.onClickOthers = this.onClickOthers.bind(this);
		this.onBack = this.onBack.bind(this);
		this.openAddCourses = this.openAddCourses.bind(this);
		this.openAddProjects = this.openAddProjects.bind(this);
		this.openAddThesis = this.openAddThesis.bind(this);
		this.openStrengths = this.openStrengths.bind(this)
	}

	changeHandler(e) {
		this.setState({[e.target.name]: e.target.value});
		console.log([e.target.name])
		if (e.target.name === 'strengths') {
			console.log('Updating')
			this.props.checkbox.selected[this.props.selectionIndex].strengths = e.target.value
		}
		if (e.target.name=== 'comments') {
			this.props.checkbox.selected[this.props.selectionIndex].comments = e.target.value
		}
		if (this.props.checkbox.selected[this.props.selectionIndex].status === true) {
			this.props.checkbox.selected[this.props.selectionIndex].others = this.state.others
		}
	}

	componentWillReceiveProps(nextProps, nextContext) {
		if (nextProps) {
			this.setState({errors: nextProps.errors})
		}
	}

	onClickOthers() {
		this.setState({showOthers: true});
		this.props.checkbox.selected[this.props.selectionIndex].courses_done = [];
		this.props.checkbox.selected[this.props.selectionIndex].projects_done = [];
		this.props.checkbox.selected[this.props.selectionIndex].thesis_done = [];
		this.props.checkbox.selected[this.props.selectionIndex].status = true;
	}

	openAddCourses() {
		this.setState({toggler1: false, toggler2: false});
		console.log({selected: this.props.checkbox.selected})
	}

	openAddProjects() {
		this.setState({toggler1: true, toggler2: false});
		console.log({selected: this.props.checkbox.selected})

	}

	openAddThesis() {
		this.setState({toggler1: false, toggler2: true});
		console.log({selected: this.props.checkbox.selected})

	}

	openStrengths() {
		this.setState({toggler1: true, toggler2: true});
		console.log({selected: this.props.checkbox.selected})

	}


	componentDidMount() {
		this.setState({errors: this.props.errors});
		console.log({LOAD: this.state.errors, LOADER: this.props.errors})
	}

	onBack() {
		this.setState({showOthers: false});
		this.props.checkbox.selected[this.props.selectionIndex].courses_done = [];
		this.props.checkbox.selected[this.props.selectionIndex].projects_done = [];
		this.props.checkbox.selected[this.props.selectionIndex].thesis_done = [];
		this.props.checkbox.selected[this.props.selectionIndex].status = false;
		this.props.checkbox.selected[this.props.selectionIndex].others = '';
		this.props.checkbox.selected[this.props.selectionIndex].comments = '';
		this.props.checkbox.selected[this.props.selectionIndex].strengths = '';

	}

	codeSelect(e) {
		this.setState({campusCode: e})
	}

	render() {
		const {errors} = this.state;
		let normalHeaders = (
			<div className="row text-center">
				<p style={{fontSize: '14px', color: 'red'}}>
					You have not done anything under the faculty?, but want to apply for LOR,
					<button onClick={this.onClickOthers} className="  text-center"
									style={{
										border: 'none',
										color: 'blue',
										borderStyle: 'none',
										background: 'none',
										margin: '0',
										padding: '0'
									}}>
						Click Here
					</button>
				</p>
				<hr/>
			</div>
		);
		let normalContent = null, heading = null;
		if (!this.state.toggler1 && !this.state.toggler2) {
			heading = (<h3 style={{background: '#000d69', color: 'white', borderRadius: '10px', padding: '5px'}}>Add Courses,
				projects or thesis done with faculty</h3>);
			normalContent = (
				<div className=' col-md-12'>
					<div className='row d-flex justify-content-between'>
						<h4 style={{

							fontSize: '20px', background: '#000d69', color: 'white', borderRadius: '5px', padding: '5px'
						}}>Add Courses</h4>
						<h4 style={{

							fontSize: '20px', color: '#000d69', background: 'white', borderRadius: '5px', padding: '5px'
						}}>Add Projects</h4>
						<h4 style={{

							fontSize: '20px', color: '#000d69', background: 'white', borderRadius: '5px', padding: '5px'
						}}>Add Thesis</h4>
					</div>
					<CoursesDone facultyId={this.props.facultyId} selectionIndex={this.props.selectionIndex}
											 front_errors={this.props.errors}/>
					<div className='row d-flex justify-content-end'>

						<button className='btn btn-sm' onClick={this.openAddProjects} style={{background: 'none', color: 'green'}}>
							<i className="fas fa-3x fa-chevron-circle-right"/>
						</button>
					</div>

				</div>
			)
		} else if (this.state.toggler1 && !this.state.toggler2) {
			heading = (<h3 style={{background: '#000d69', color: 'white', borderRadius: '10px', padding: '5px'}}>Add Courses,
				projects or thesis done with faculty</h3>);
			normalContent = (
				<div className=' col-md-12'>
					<div className='row d-flex justify-content-between'>
						<h4 style={{

							fontSize: '20px', color: '#000d69', background: 'white', borderRadius: '5px', padding: '5px'
						}}>Add Courses</h4>
						<h4 style={{

							fontSize: '20px', background: '#000d69', color: 'white', borderRadius: '5px', padding: '5px'
						}}>Add Projects</h4>
						<h4 style={{

							fontSize: '20px', color: '#000d69', background: 'white', borderRadius: '5px', padding: '5px'
						}}>Add Thesis</h4>
					</div>
					<ProjectsDone facultyId={this.props.facultyId} selectionIndex={this.props.selectionIndex}
					/>
					<div className='row d-flex justify-content-between'>
						<button className='btn btn-sm' onClick={this.openAddCourses} style={{background: 'none', color: 'green'}}>
							<i className="fas fa-3x fa-chevron-circle-left"/>
						</button>
						<button className='btn btn-sm' onClick={this.openAddThesis} style={{background: 'none', color: 'green'}}>
							<i className="fas fa-3x fa-chevron-circle-right"/>
						</button>
					</div>
				</div>
			)
		} else if (!this.state.toggler1 && this.state.toggler2) {
			heading = (<h3 style={{background: '#000d69', color: 'white', borderRadius: '10px', padding: '5px'}}>Add Courses,
				projects or thesis done with faculty</h3>);
			normalContent = (
				<div className=' col-md-12'>
					<div className='row d-flex justify-content-between'>
						<h4 style={{

							fontSize: '20px', color: '#000d69', background: 'white', borderRadius: '5px', padding: '5px'
						}}>Add Courses</h4>
						<h4 style={{

							fontSize: '20px', color: '#000d69', background: 'white', borderRadius: '5px', padding: '5px'
						}}>Add Projects</h4>
						<h4 style={{

							fontSize: '20px', background: '#000d69', color: 'white', borderRadius: '5px', padding: '5px'
						}}>Add Thesis</h4>
					</div>
					<ThesisDone facultyId={this.props.facultyId} selectionIndex={this.props.selectionIndex}
					/>
					<div className='row d-flex justify-content-between'>
						<button className='btn btn-sm' onClick={this.openAddProjects} style={{background: 'none', color: 'green'}}>
							<i className="fas fa-3x fa-chevron-circle-left"/>
						</button>
						<button className='btn btn-primary' onClick={this.openStrengths}
										style={{background: 'none', color: 'green'}}>
							Proceed To Next Step
						</button>

					</div>
				</div>
			)
		} else if (this.state.toggler1 && this.state.toggler2) {
			heading = (
				<h3 style={{background: '#000d69', color: 'white', borderRadius: '10px', padding: '5px'}}>Strengths and Other
					Comments</h3>);
			normalContent = (
				<div className=' col-md-12'>
					<TextAreaFieldGroup
						placeholder="Add your Strengths and Achievements here, this will help faculty in writing a better LOR"
						error={errors.strengths}
						type="text" onChange={this.changeHandler} rows={60} cols="150"
						value={this.state.strengths}
						name='strengths'/>
					<TextAreaFieldGroup
						placeholder="Anything additional which you want the faculty to know while writing your Lor can be added here"
						error={errors.comments}
						type="text" onChange={this.changeHandler} rows={60} cols="150"
						value={this.state.comments}
						name='comments'/>
					<div className='row d-flex justify-content-between'>
						<button className='btn btn-primary' onClick={this.openAddThesis}
										style={{background: 'none', color: 'green'}}>
							Back
						</button>
					</div>
				</div>
			)
		}

		let othersContent = (
			<div className='row col-md-12 d-flex justify-content-between'>
				<div className='col-md-12'>
					<TextAreaFieldGroup placeholder="Please describe, the matter clearly" error={errors.others}
															type="text" onChange={this.changeHandler} rows={60} cols="150"
															value={this.state.others}
															name='others'/>
				</div>
			</div>
		);
		let othersHeaders = (
			<div className="row col-md-12 d-flex justify-content-start">
				<button className='btn btn-sm' onClick={this.onBack} style={{background: 'none', color: 'green'}}>
					<i className="fas fa-3x fa-chevron-circle-left"/></button>
				<hr/>
			</div>
		);
		return (
			<div className="LoginModal container-fluid col-md-12" style={{margin: '0px'}}>
				<div className="row d-flex justify-content-center">
					{heading}
				</div>
				<div className="row d-flex justify-content-center">
					{this.state.showOthers ? othersHeaders : normalHeaders}
				</div>
				{this.state.showOthers ? othersContent : normalContent}
			</div>
		);
	}
}

CPTSelectorNew.propTypes = {
	auth: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired,
	facultyId: PropTypes.number.isRequired,
	checkbox: PropTypes.object.isRequired,
	selectionIndex: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
	auth: state.auth,
	errors: state.errors,
	checkbox: state.checkbox
});

export default connect(mapStateToProps)(CPTSelectorNew);
