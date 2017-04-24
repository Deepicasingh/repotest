import React from "react";
import ReactDOM from "react-dom";

const defaultState = {
	todo: {
		todos:[]
	}
};

class TodoForm extends React.Component {
	constructor(){
		super();
	}
	componentWillMount(){
					this.state=defaultState;
					this.state.message='';
	}
	// componentDidMount(){

	// }
	handleSubmit(){
		console.log("----------------------------",this);
	 	this.state.todo.todos.push({
	 		todoName:this.state.message,
	 		id:Math.floor(Math.random()* 10000),
	 		done:false
	 	})
	 	this.setState({'message':''})
 		
		console.log("------------after----------------",this.state);
 	}

 
 onMessageChanged(e){
		let message = e.target.value;
		this.setState({ message: message });
	}

render(){
	return(
		   <div className={"text_label"}>
		   	Enter TaskName: <input className={"input"} name="todoName" type='text' placeholder='Enter Task' 
						onChange = {this.onMessageChanged.bind(this)}
						value = {this.state.message}/>
          
		       <button className={"button"} onClick={this.handleSubmit.bind(this)}>ADD</button>
					 <TodoList todos={this.state}/><br/>
			 </div>
    )
}
}

class TodoList extends React.Component{
	constructor(){
		super()
	}
	
	componentWillMount(){
		try {
			this.setState({ todos: this.props.todos.todo.todos });
			
		}catch(e){
			console.error(e)
		}
	}

	// componentDidMount(){
	// 	console.log("mounted")
	// 	console.log(this.state)
	// }	
	render(){
		console.log("todolist render");
		let items=[];
			return(
 				<TodoItem 
 					todos = {this.state.todos}
 				/>
			)
	 }
}

class TodoItem extends React.Component{
 	componentWillMount(){
 			console.log("in todoitem mount")
			this.setState({ todos: this.props.todos })
 	}

	onDeleteClick(event){
		var id = event.target.getAttribute('id');
		var clone = Object.assign([],this.state.todos)
		console.log(id)
	 	var index=null;
	 	console.log(clone)
  	for(let i=0;i<this.state.todos.length;i++)
  	{
  	 
  		if(this.state.todos[i].id === parseInt(id)){
  			console.log("match found")
  			index=i;
  		}
  	}


	  clone.splice(index,1);
		console.log(clone,"------")
		console.log(index)
		this.setState({'todos':clone})  
  

	}

	onCompletedClick(elem){
			var id = elem.target.getAttribute('id');
		var clone = Object.assign([],this.state.todos)
	 	var index=null;
	 	console.log(id)
  	for(let i=0;i<clone.length;i++)
  	{
  		
  		if(clone[i].id === parseInt(id)){
  			console.log("match found")
  			clone[i].done=!clone[i].done;
  		}
  	}
  		this.setState({'todos':clone})
  	   console.log(clone)
	}
		render(){
		let self = this
		let items = []; 

		this.state.todos.map(function(el, idx){
			items.push(
		
				<li key={idx} className={"text_style"}>
					<span className={ el.done ? "todo_strike" : "pending"}>{el.todoName}</span>
					<button className={"button"} id={el.id} onClick={self.onDeleteClick.bind(self)}>DELETE</button>
					<button className={"button"} id={el.id} onClick={self.onCompletedClick.bind(self)}>DONE</button>
					</li>
			
			)				
		})

		return(
			<ul>
				{items}
			</ul>
		)		
	}
}

class App extends React.Component{
	constructor(){
		super()
	}
	render(){
		return(
		<div>
				<TodoForm/>
		</div>
		)
	}
}


ReactDOM.render(<App/>,document.getElementById("container"))





