// import React, { Component } from 'react'
// import { connect } from 'react-redux'
// import { setLanguage } from '../../../redux/actions/indexActions'
// import languagesText from '../../../../src/LanguagesData/LanguagesText'

// class WelcomePage extends Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       langButtonTxt: ['БЪЛГАРСКИ', 'ENGLISH'],
//       welcomeTxtRendered: false
//     }
//     this.language = this.props.languageSelected
//   }
  
//   SelectedLanguageElement (props) {
//     let texts = {...languagesText[props.language]}
//     texts = texts.welcomePage
//     return (
//       props.language !== '' &&
      
//       <div className='welcome-text'>
//         <h2>{texts.welcomeH2}</h2>
//         <h3>{texts.welcomeH3}</h3>
//         {texts.exampleTexts.map((el, idx) => <p className={'welcome-text'} key={idx}>{el}</p>)}
//         <button className='button'
//                 onClick={() => this.props.history.push('/control-form')}>{texts.startButton.toUpperCase()}</button>
//       </div>
//     )
//   }
  
//   render () {
//     return (
//       <div className='landing'>
//         <div className='landing-buttons'>
          
//           {/*<LanguageButtons strings={this.state.langButtonTxt} callbackfn={(el, idx) => <button */}
//           {/*key={idx} */}
//           {/*onClick={eventWorker.onLangButtonClick.bind(this)}>{el}</button>}/> */}
//         </div>
//         {this.SelectedLanguageElement({...this.props})}
//       </div>
//     )
//   }
// }

// function mapStateToProps (state) {
//   return {
//     language: state.languageSelected
//   }
// }

// function mapDispatchToProps (dispatch) {
//   return {
//     setLanguage: language => dispatch(setLanguage(language))
//   }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(WelcomePage)
