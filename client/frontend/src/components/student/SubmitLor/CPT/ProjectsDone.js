import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import classnames from "classnames";
import getYearsForSelector from '../../../../utils/getYearsForSelector'
import TextFieldGroup from "../../../common/TextFieldGroup";

class ProjectsDone extends Component {
	constructor() {
		super();
		this.state = {
			projects: [{
				projectTitle: '',
				year: '',
				sem: '',
				grade: ''
			}],
			errors: {},
			projectCnt: 1,
			years: ['year-0'],
			projectTitles: ['project-0'],
			yearsControl: [],
			semesters: ['sem-0'],
			semControl: [],
			gradesControl: [],
			grades:['grade-0']
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAddProject = this.onAddProject.bind(this);
		this.onRemove = this.onRemove.bind(this);
	}

	componentDidMount() {
		let len = this.props.checkbox.selected[this.props.selectionIndex].projects_done.length
		if (len !== 0) {
			let newCourseArray = this.state.projectTitles, newSemArray = this.state.semesters, newYearArray = this.state.years,
				newGradesArray = this.state.grades, semControl = [], yearControl = [];
			for (let i = 0; i < len; i++) {
				newCourseArray.push('project-' + this.state.projectCnt);
				newYearArray.push('year-' + this.state.projectCnt);
				newSemArray.push('sem-' + this.state.projectCnt);
				newGradesArray.push('grade-' + this.state.projectCnt);
				semControl.push({'label':this.props.checkbox.selected[this.props.selectionIndex].projects_done[i].sem,
					'value': this.props.checkbox.selected[this.props.selectionIndex].projects_done[i].sem});
				yearControl.push({'label':this.props.checkbox.selected[this.props.selectionIndex].projects_done[i].year,
					'value': this.props.checkbox.selected[this.props.selectionIndex].projects_done[i].year})
			}
			this.setState({
				projectCnt: this.state.projectCnt + 1,
				semesters: newSemArray,
				years: newYearArray,
				projectTitles: newCourseArray,
				projects: this.props.checkbox.selected[this.props.selectionIndex].projects_done,
				grades: newGradesArray,
				semControl: semControl,
				yearsControl: yearControl
			})
		}
	}
	changeHandler = (i, type) => e => {
		console.log({HANDLER_LOG: {i: i, type: type, e: e, eValue: e.target}});
		let projectHandler = this.state.projects;
		if (type === 'projectTitle') {
			projectHandler[i].projectTitle = e.target.value
		} else if (type === 'year') {
			projectHandler[i].year = e.value;
			let yearsChange = this.state.yearsControl;
			yearsChange[i] = e;
			this.setState({yearsControl: yearsChange})
		} else if (type === 'sem') {
			projectHandler[i].sem = e.value;
			let semChange = this.state.semControl;
			semChange[i] = e;
			this.setState({semControl: semChange})
		}else if (type === 'grade') {
			projectHandler[i].grade = e.target.value;
		}
		this.setState({
			projects: projectHandler
		});
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].projects_done=projectHandler;
		this.props.checkbox.selected = getSelected;
		console.log({STATE_LOG:
				{projects: this.state.projects, handler: projectHandler, yearsControl: this.state.yearsControl,semControl: this.state.semControl}})
	};


	onAddProject() {
		let newProjectArray = this.state.projectTitles,newYearArray = this.state.years,newSemArray = this.state.semesters,
			newProjects = this.state.projects, newGradesArray=this.state.grades;
		newProjectArray.push('project-' + this.state.projectCnt);
		newYearArray.push('year-' + this.state.projectCnt);
		newSemArray.push('sem-' + this.state.projectCnt);
		newGradesArray.push('grade-' + this.state.projectCnt);
		newProjects.push({
			projectTitle: '',
			year: '',
			sem: '',
			grade: ''
		});
		this.setState({
			projectCnt: this.state.projectCnt + 1,
			years: newYearArray,
			projectTitles: newProjectArray,
			projects: newProjects,
			semesters: newSemArray,
			grades: newGradesArray
		})

	}

	onSubmit(e) {
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].projects_done=this.state.projects;
		this.props.checkbox.selected = getSelected
	}
	onRemove(index) {
		if(this.state.projectCnt===1) {
		this.setState({projects: [{
				projectTitle: '',
				year: '',
				sem: '',
				grade:''
			}],
			years: ['year-0'],
			projectTitles: ['project-0'],
			semesters: ['sem-0'],grades:['grade-0'],});
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].projects_done=this.state.projects;
		this.props.checkbox.selected = getSelected
		}else {
		this.state.projects.splice(index,1);
		this.state.years.splice(index,1);
		this.state.projectTitles.splice(index, 1);
		this.state.semesters.splice(index,1);
		this.state.grades.splice(index,1);
		this.setState({projects:this.state.projects,projectCnt:this.state.projectCnt-1,
		years: this.state.years, grades: this.state.grades,
			projectTitles: this.state.projectTitles,
			semesters: this.state.semesters
		});
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].projects_done=this.state.projects;
		this.props.checkbox.selected = getSelected
		}
	}

	render() {
		const customSelectStyles = {
			control: (base, state) => ({
				...base,
				height: '50px',
				'min-height': '34px',
				'max-height': '50px',
				'min-width': '250px'
			}),
			menuList: base => ({
				...base,
				minHeight: '200px',
				height: '200px',
				minWidth: '250px'
			}),
		};
		let yearSelector = getYearsForSelector();
		let inputs = [];
		for (let i = 0; i < this.state.projectCnt; i++) {
			let errors={};
			if(this.props.checkbox.errors && this.props.checkbox.errors.projects_done &&
				this.props.checkbox.errors.projects_done[i]) {
				errors=this.props.checkbox.errors.projects_done[i]
			}
			inputs.push(<div className='row' style={{margin:'3px', borderRadius:'5px', borderStyle:'solid'}} key={i}>
				<div className='row d-flex justify-content-between col-md-12'>
								<h5 className='text-center'>Project {i+1}:</h5>
										<button onClick={() => this.onRemove(i)}
									style={{borderRadius:'3px', background:'red', color:'white', borderStyle:'none'}}
										><i className="fas fa-times"/></button>

				</div>
				<div className='row'>
					<div className='col-md-6'>
						<label>Project Title:</label>
					<TextFieldGroup placeholder="Enter Project Title" error={errors.projectTitle}
												type="text" onChange={this.changeHandler(i, 'projectTitle')}
												value={this.state.projects[i].projectTitle}
												name={this.state.projectTitles[i]}/>
					</div>
						<div className='col-md-6'>
						<label>Grade:</label>
						<TextFieldGroup placeholder="Enter your Grade" error={errors.grade}
												type="number" onChange={this.changeHandler(i, 'grade')}
												value={this.state.projects[i].grade}
												name={this.state.grades[i]}/>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6' style={{marginRight:'2px'}}>
						<label>Select Year:</label>
						<Select options={yearSelector}
										className={classnames('isSearchable', {'is-invalid':errors.year})}
										styles={customSelectStyles}
										placeholder="Select year"
										name={this.state.years[i]} value={this.state.yearsControl[i]}
										onChange={this.changeHandler(i, 'year')}>
						</Select>
						{errors.year && (
              <div className="invalid-feedback">{errors.year}</div>
            )}
					</div>
					<div className='col-md-6' >
						<label>Select Semester:</label>
						<Select options={[{value: 'Sem-I', label: 'Sem-I'}, {value: 'Sem-II', label: 'Sem-II'}]}
										className={classnames('isSearchable', {'is-invalid': errors.sem})}
										styles={customSelectStyles}
										placeholder="Select semester"
										name={this.state.semesters[i]} value={this.state.semControl[i]}
										onChange={this.changeHandler(i, 'sem')}>
						</Select>
						{errors.sem && (
              <div className="invalid-feedback">{errors.sem}</div>
            )}
					</div>
				</div>
			</div>)
		}
		return (
			<div className="ProjectsDone container-fluid col-md-12">
					{/*<h3>Add Courses, projects or thesis done with faculty</h3>*/}
					{/*<div className="row text-center">*/}
					{/*	<p>*/}
					{/*		It is recommended that you do at least one of the following for Lor Request to be accepted*/}
					{/*	</p>*/}
					{/*	<hr/>*/}
					{/*</div>*/}
					{inputs}
					<div className="row text-center d-flex justify-content-center">
						<button type="submit" onClick={this.onAddProject} className="btn-sm  text-center"
										style={{background: 'green', color: 'white', borderRadius: '5px'}}>
							<i className="fas fa-plus"/>Add another Project
						</button>

					</div>
			</div>
		);
	}
}

ProjectsDone.propTypes = {
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

export default connect(mapStateToProps)(ProjectsDone);
