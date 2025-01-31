
import fs from 'fs';

// parser function for custom syntax
function parse(instr){
	// trim, remove duplicate line breaks and split
	let lines = instr.trim().replace(/\n+/g, '\n').split('\n');

	// output storage
	let output = '';
	// state variables
	let lineptr = 0;
	let state = 0;
	/*
	State List
	0: init, not inside a stated loop
	1: inside @begin
	*/
	let curprefix = '';
	let curpostfix = '';

	for(;lineptr < lines.length; lineptr++){
		// main loop
		let currline = lines[lineptr].trim(); 
		// Syntax for all states
		if(currline == ''){
			// this is an empty line
			continue;
		}
		if(currline[0]== '#' ){ 
			// comment line, directly append with no processing
			output += currline + '\n';
			continue;
		}
		// Stated syntaxes
		if(state == 0){
			if(currline.startsWith('@begin') ){
				// now we are within host-suffix,url,group generator.
				if(state != 0) console.log('E: Cannot @begin within another stated loop');
				state = 1; // jump to state 1
				currline = currline.replace(/ +/g, ' ');
				let positions = currline.split(' ');
				// [ '@begin', 'host-suffix', 'direct' ]
				curprefix = positions[1];
				curpostfix = positions[2];
				continue;
			}
			if (1){
				// no syntax used, just pass the line through
				output += currline + '\n';
			}
		}
		if(state == 1){
			if(currline == '@end'){
				// hitting the end keyword
				state = 0; // jump state and clear variables
				curprefix = '';
				curpostfix = '';
				continue;
			} 
			if (1) {
				// not hitting the end word, keep processing each
				if(currline.includes('#') == true){
					// line contains comment, Qx does not support inline comment
					// Just drop that comment.
					let splited = currline.split('#', 2)
					for(let each in splited) splited[each] = splited[each].trim();
					output += curprefix + ',' + splited[0] + ',' + curpostfix;  
				} else {
					// line contains no comment, no special care needed
					output += curprefix + ',' + currline + ',' + curpostfix;
				}
				output += '\n';
				continue;
			}
		}

	}

	return output;
}

// create directories
fs.mkdirSync('./public/list', {recursive: true})
fs.mkdirSync('./public/multi', {recursive:true})

// copy static files
let assets = fs.readdirSync('./assets')
console.log('Assets:', assets)
for(let each of assets){
	fs.copyFileSync('./assets/'+each, './public/'+each)
}

// track info listing
let infolist = {
	lists: [],
	multi: []
}

// build single lists
let listfiles = fs.readdirSync('./lists')
let lists = {}
console.log('ListFiles:',listfiles)
for(let each of listfiles){
	let f = fs.readFileSync('./lists/'+each, 'utf-8');
	let list = parse(f)
	lists[each] = list
	fs.writeFileSync('./public/list/'+each, list, {flag:'w'})
	infolist.lists.push( './public/list/'+each )
	//console.log(parse(f))
}

// building multiple lists
let directivefile = fs.readFileSync('./Multilist.json');
let directives = JSON.parse(directivefile)
for(let each in directives){
	let fullstr = ''
	for(let i of directives[each]){
		let fname = i + '.txt'
		let list = lists[fname]
		fullstr += '# Including: ' + fname + '\n'
		fullstr += list + '\n'
	}
	fs.writeFileSync('./public/multi/'+each+'.txt', fullstr, {flag:'w'})
	infolist.multi.push('./public/multi/'+each+'.txt')
}

// write tracking file
let tracking = JSON.stringify(infolist, null, 2)
fs.writeFileSync('./public/tracking.json', tracking, {flag:'w'})