var ce = new CodeEditor;
// test code.
CodeEditor.test = function(){

}()

// ##################Append static class func.##################
CodeEditor.extend({
	find:function(){
		console.log('find func.')
	},
	/**
	 * callback
	 * @param  {[type]} CE [description] CodeEditor
	 * @return {[type]}    [description]
	 */
	extended:function(CE) {}
})
CodeEditor.find();
//ce.find();// Uncaught TypeError: ce.find is not a function

// ##################Append instance of class func.##################
CodeEditor.include({
	find:function(){
		console.log('find func.')
	},
	/**
	 * callback
	 * @param  {[type]} CE [description] CodeEditor
	 * @return {[type]}    [description]
	 */
	included:function(CE) {}
})
ce.find();