// function reducer(state, action) {
//     // field name and value are retrieved from event.target
//     const { name, value } = action
    
//     // merge the old and new state
//     return { ...state, [name]: value }
//   }

//   const initialState = {
//     firstName: '',
//     lastName: ''
//   };
//   function reducer(state, action) {
//     switch (action.type) {
//       case 'firstName':
//         return { firstName: action.payload };
//       case 'lastName':
//         return { lastName: action.payload };
//       default:
//         throw new Error();
//     }
//   }
  
//   function Counter() {
//     const [state, dispatch] = useReducer(reducer, initialState);
//     return (
//       <>
//         <input
//           type="text"
//           name="firstName"
//           placeholder="First Name"
//           onChange={(event) => {
//             dispatch({
//              type: 'firstName',
//              payload: event.target.value
//             })
//           }}
//           value={state.firstName} />
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Last Name"
//           onChange={(event) => {
//             dispatch({
//              type: 'lastName',
//              payload: event.target.value
//             })
//           }}
//           value={state.lastName} />
//      </>
//     );
//   }