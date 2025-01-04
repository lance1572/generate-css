const fs = require('fs');
const cheerio = require('cheerio');

// Read html

const html = fs.readFileSync('index.html', 'utf-8');
const $ =cheerio.load(html);

// Collect class names

const classSet = new Set();
$('[class]').each((_, element) => {
    const classes = $(element).attr('class').split(/\s+/);
    classes.forEach(className => classSet.add(className));
});

// Check for existing content

let existingCss = '';
if(fs.existsSync('styles.css')) {
    existingCss = fs.readFileSync('styles.css', 'utf8');
}

// Generate new selectors

let newCss = '';
classSet.forEach(className => {
    if(!existingCss.includes(`.${className} {`)) {
        const formattedComment = `/*======= ${className.charAt(0).toUpperCase() + className.slice(1)} ======*/`; 
        newCss += `${formattedComment}\n.${className} {}\n\n\n\n`;
    }
});

// // Generate the css
// let cssOput = '';
// classSet.forEach(className => {
//     const formattedComment = `/*======= ${classNamee.charAt(0).toUpperCase() + className.slice(1)} ======*/`; 
//     cssOput += `${formattedComment}\n.${className} \n`;
// });

if(newCss) {
    fs.appendFileSync('styles.css', `\n${newCss}`);

}


// Lets write it to the file 

// fs.writeFileSync('styles.css', cssOput);
// console.log('css styles written');