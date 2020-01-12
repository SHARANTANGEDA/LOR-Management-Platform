import React, {Component} from 'react'
import {PropTypes} from 'prop-types'
import {connect} from 'react-redux'
import Select from 'react-select'
import classnames from "classnames";
import getYearsForSelector from '../../../../utils/getYearsForSelector'
import TextFieldGroup from "../../../common/TextFieldGroup";

class CoursesDone extends Component {
	constructor() {
		super();
		this.state = {
			courses: [{
				courseCode: '',
				sem: '',
				year: '',
				grade: ''
			}],
			courseCnt: 1,
			semesters: ['sem-0'],
			years: ['year-0'],
			courseCodes: ['course-0'],
			grades: ['grade-0'],
			yearsControl: [],
			semControl: [],
			gradesControl: [],
			errors: {}
		};
		this.changeHandler = this.changeHandler.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onAddCourse = this.onAddCourse.bind(this);
		this.onRemove = this.onRemove.bind(this)
	}


	// componentWillReceiveProps(nextProps, nextContext) {
	// 	if (nextProps) {
	// 		this.setState({front_errors: nextProps.front_errors})
	// 		console.log({RECIEVED: this.state.front_errors})
	// 	}
	// }
	changeHandler = (i, type) => e => {
		console.log({HANDLER_LOG: {i: i, type: type, e: e, eValue: e.target}})
		let coursesHandler = this.state.courses;
		if (type === 'courseCode') {
			coursesHandler[i].courseCode = e.target.value
		} else if (type === 'year') {
			coursesHandler[i].year = e.value;
			let yearsChange = this.state.yearsControl;
			yearsChange[i] = e;
			this.setState({yearsControl: yearsChange})
		} else if (type === 'sem') {
			coursesHandler[i].sem = e.value;
			let semChange = this.state.semControl;
			semChange[i] = e;
			this.setState({semControl: semChange})
		} else if (type === 'grade') {
			coursesHandler[i].grade = e.target.value;
		}
		this.setState({
			courses: coursesHandler
		});
		let getSelected = this.props.checkbox.selected;
		console.log(getSelected, this.props.selectionIndex);
		getSelected[this.props.selectionIndex].courses_done = coursesHandler;
		this.props.checkbox.selected = getSelected;
		// console.log({
		// 	STATE_LOG: {
		// 		courses: this.state.courses, handler: coursesHandler, yearsControl: this.state.yearsControl,
		// 		semControl: this.state.semControl
		// 	}
		// })
	};

	componentDidMount() {
		let len = this.props.checkbox.selected[this.props.selectionIndex].courses_done.length
		if (len !== 0) {
			let newCourseArray = this.state.courseCodes, newSemArray = this.state.semesters, newYearArray = this.state.years,
				newGradesArray = this.state.grades, semControl = [], yearControl = [];
			for (let i = 0; i < len; i++) {
				newCourseArray.push('course-' + this.state.courseCnt);
				newYearArray.push('year-' + this.state.courseCnt);
				newSemArray.push('sem-' + this.state.courseCnt);
				newGradesArray.push('grade-' + this.state.courseCnt);
				semControl.push({'label':this.props.checkbox.selected[this.props.selectionIndex].courses_done[i].sem,
					'value': this.props.checkbox.selected[this.props.selectionIndex].courses_done[i].sem});
				yearControl.push({'label':this.props.checkbox.selected[this.props.selectionIndex].courses_done[i].year,
					'value': this.props.checkbox.selected[this.props.selectionIndex].courses_done[i].year})
			}
			this.setState({
				courseCnt: this.state.courseCnt + 1,
				semesters: newSemArray,
				years: newYearArray,
				courseCodes: newCourseArray,
				courses: this.props.checkbox.selected[this.props.selectionIndex].courses_done,
				grades: newGradesArray,
				semControl: semControl,
				yearsControl: yearControl
			})
		}
	}


	onRemove(index) {
		if (this.state.courseCnt === 1) {
			this.setState({
				courses: [{
					courseCode: '',
					sem: '',
					year: '',
					grade: ''
				}],
				semesters: ['sem-0'],
				years: ['year-0'],
				courseCodes: ['course-0'], grades: ['grade-0'],
			});
			let getSelected = this.props.checkbox.selected;
			getSelected[this.props.selectionIndex].courses_done = this.state.courses;
			this.props.checkbox.selected = getSelected
		} else {
			this.state.courses.splice(index, 1);
			this.state.courseCodes.splice(index, 1);
			this.state.semesters.splice(index, 1);
			this.state.years.splice(index, 1);
			this.state.grades.splice(index, 1);
			this.setState({
				courses: this.state.courses, grades: this.state.grades,
				years: this.state.years, courseCnt: this.state.courseCnt - 1,
				courseCodes: this.state.courseCodes,
				semesters: this.state.semesters
			});
			let getSelected = this.props.checkbox.selected;
			getSelected[this.props.selectionIndex].courses_done = this.state.courses;
			this.props.checkbox.selected = getSelected
		}

	}

	// componentWillReceiveProps(nextProps, nextContext) {
	// 	if (nextProps) {
	// 		this.setState({errors: nextProps.errors})
	// 	}
	// }

	onAddCourse() {
		let newCourseArray = this.state.courseCodes, newSemArray = this.state.semesters, newYearArray = this.state.years,
			newCourses = this.state.courses, newGradesArray = this.state.grades;
		newCourseArray.push('course-' + this.state.courseCnt);
		newYearArray.push('year-' + this.state.courseCnt);
		newSemArray.push('sem-' + this.state.courseCnt);
		newGradesArray.push('grade-' + this.state.courseCnt);
		newCourses.push({
			courseCode: '',
			sem: '',
			year: '',
			grade: ''
		});
		this.setState({
			courseCnt: this.state.courseCnt + 1,
			semesters: newSemArray,
			years: newYearArray,
			courseCodes: newCourseArray,
			courses: newCourses,
			grades: newGradesArray
		})

	}

	onSubmit(e) {
		let getSelected = this.props.checkbox.selected;
		getSelected[this.props.selectionIndex].courses_done = this.state.courses;
		this.props.checkbox.selected = getSelected
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
		for (let i = 0; i < this.state.courses.length; i++) {
			let errors = {};
			if (this.props.checkbox.errors && this.props.checkbox.errors.courses_done &&
				this.props.checkbox.errors.courses_done[i]) {
				errors = this.props.checkbox.errors.courses_done[i]
			}
			inputs.push(<div className='row' style={{margin: '3px', borderRadius: '5px', borderStyle: 'solid'}} key={i}>
				<div className='row d-flex justify-content-between col-md-12'>
					<h5 className='text-center'>Course {i + 1}:</h5>
					<button onClick={() => this.onRemove(i)}
									style={{borderRadius: '3px', background: 'red', color: 'white', borderStyle: 'none'}}><i
						className="fas fa-times"/></button>
				</div>
				<div className='row'>
					<div className='col-md-6'>
						<label>Course Code:</label>
						<TextFieldGroup placeholder="Enter Course Code" error={errors.courseCode}
														type="text" onChange={this.changeHandler(i, 'courseCode')}
														value={this.state.courses[i].courseCode}
														name={this.state.courseCodes[i]}/>
					</div>
					<div className='col-md-6'>
						<label>Grade:</label>
						<TextFieldGroup placeholder="Enter your Grade" error={errors.grade}
														type="number" onChange={this.changeHandler(i, 'grade')}
														value={this.state.courses[i].grade}
														name={this.state.grades[i]}/>
					</div>
				</div>
				<div className='row'>
					<div className='col-md-6'>
						<label>Select Year:</label>
						<Select options={yearSelector}
										className={classnames('isSearchable', {'is-invalid': errors.year})}
										styles={customSelectStyles}
										placeholder="Select year"
										name={this.state.years[i]} value={this.state.yearsControl[i]}
										onChange={this.changeHandler(i, 'year')}>
						</Select>
						{errors.year && (
							<div className="invalid-feedback">{errors.year}</div>
						)}
					</div>
					<div className='col-md-6'>
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
			<div className="LoginModal container-fluid col-md-12">
				{inputs}
				<div className="row text-center d-flex justify-content-center">
					<button type="submit" onClick={this.onAddCourse} className="btn-sm  text-center"
									style={{background: 'green', color: 'white', borderRadius: '5px'}}>
						<i className="fas fa-plus"/>Add another Course
					</button>
				</div>
			</div>
		);
	}
}

CoursesDone.propTypes = {
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

export default connect(mapStateToProps)(CoursesDone);
