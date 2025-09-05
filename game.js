let colors = ['black', 'navy', 'darkblue', 'mediumblue', 'blue', 'darkgreen', 'green', 'teal', 'darkcyan', 'deepskyblue', 'darkturquoise', 'mediumspringgreen', 'lime', 'springgreen', 'aqua', 'cyan', 'midnightblue', 'dodgerblue', 'lightseagreen', 'forestgreen', 'seagreen', 'darkslategray', 'darkslategrey', 'limegreen', 'mediumseagreen', 'turquoise', 'royalblue', 'steelblue', 'darkslateblue', 'mediumturquoise', 'indigo', 'darkolivegreen', 'cadetblue', 'cornflowerblue', 'rebeccapurple', 'mediumaquamarine', 'dimgray', 'dimgrey', 'slateblue', 'olivedrab', 'slategray', 'slategrey', 'lightslategray', 'lightslategrey', 'mediumslateblue', 'lawngreen', 'chartreuse', 'aquamarine', 'maroon', 'purple', 'olive', 'gray', 'grey', 'skyblue', 'lightskyblue', 'blueviolet', 'darkred', 'darkmagenta', 'saddlebrown', 'darkseagreen', 'lightgreen', 'mediumpurple', 'darkviolet', 'palegreen', 'darkorchid', 'yellowgreen', 'sienna', 'brown', 'darkgray', 'darkgrey', 'lightblue', 'greenyellow', 'paleturquoise', 'lightsteelblue', 'powderblue', 'firebrick', 'darkgoldenrod', 'mediumorchid', 'rosybrown', 'darkkhaki', 'silver', 'mediumvioletred', 'indianred', 'peru', 'chocolate', 'tan', 'lightgray', 'lightgrey', 'thistle', 'orchid', 'goldenrod', 'palevioletred', 'crimson', 'gainsboro', 'plum', 'burlywood', 'lightcyan', 'lavender', 'darksalmon', 'violet', 'palegoldenrod', 'lightcoral', 'khaki', 'aliceblue', 'honeydew', 'azure', 'sandybrown', 'wheat', 'beige', 'whitesmoke', 'mintcream', 'ghostwhite', 'salmon', 'antiquewhite', 'linen', 'lightgoldenrodyellow', 'oldlace', 'red', 'fuchsia', 'magenta', 'deeppink', 'orangered', 'tomato', 'hotpink', 'coral', 'darkorange', 'lightsalmon', 'orange', 'lightpink', 'pink', 'gold', 'peachpuff', 'navajowhite', 'moccasin', 'bisque', 'mistyrose', 'blanchedalmond', 'papayawhip', 'lavenderblush', 'seashell', 'cornsilk', 'lemonchiffon', 'floralwhite', 'snow', 'yellow', 'lightyellow', 'ivory', 'white']
let viewed_colors = []
let incorrectly_answered_colors = []
let count = 0
let right_answers = 0;
let index = -1;
let content;
let main = document.querySelector("#main")
const answer = document.getElementById("answer");
let submit = document.getElementById("submit")
let submitanswer = document.getElementById("submitanswer")
let footer = document.querySelector("footer")
let inputlabel = document.getElementById("inputlabel")
let header = document.querySelector("header")
let hexcod = document.querySelector("#hex-code")
let starttime = 0, duration = 0,averageduration = 0;
let aside = document.querySelector("aside")
let g = document.createElement('div')
let wrong_answers = []
const correct_answers = []
g.className = 'tclose';


// enter has same effect as submit button   
document.addEventListener("keydown",(e) =>   {
    if (e.key == "Enter") {
        submit.click();
    }
})

// click
submit.onclick = function () {

    if (starttime) {
        duration = performance.now() - starttime
    }
    starttime = performance.now();
    let text = answer.value; 
    text = text.replace(/\s+/g, "").toLowerCase();
    submitanswer.textContent = text
    
    answer.value = ""
    let color = document.body.style.backgroundColor
    

    // evaluate last step
    if (index >= 0) {
        if (index < 4 && colors.length && (viewed_colors.length + wrong_answers.length) < 4) {
            viewed_colors.push(color)
            colors.splice(colors.indexOf(color),1)
        } else if ( viewed_colors.length + wrong_answers.length){
            count ++;
            averageduration = ((count-1) * averageduration + duration) / (count)

            //remove color
            if (viewed_colors.splice(viewed_colors.indexOf(color),1).length) {}
            else {alert();wrong_answers.splice(wrong_answers.indexOf(color),1)}
            
            if (text == color){
                right_answers++;
                correct_answers.push(color)
                submitanswer.textContent = color + " was correct!" 
                if (right_answers == 148) {
                    alert("you have answered all colors correctly once.")
                }
            } 
            else {
                // alert()
                if (wrong_answers.indexOf(color) == -1) {
                    wrong_answers.push(color)
                }
                submitanswer.textContent = "Expected: " + color + ", but was: " + text + "."
            }
            footer.textContent = "correct answers: " + right_answers + " out of " + count + " with average answer time: " + (averageduration / 1000).toFixed(2)  + " s."
            console.log(viewed_colors,correct_answers,wrong_answers)
        } 
    }
    
    // show next card
    index -= (index == 7 && viewed_colors.length) ? 1 : 0
    index = ( index + 1 ) % 8
    if (index < 4 && colors.length && viewed_colors.length < 4) {
        const rand_idx = Math.floor(Math.random() * colors.length)
        color  = colors[rand_idx];
        document.body.style.backgroundColor = color;
        header.innerHTML = "Learn new HTML color: <br>" 
        inputlabel.textContent = "New color: " + document.body.style.backgroundColor
        submit.textContent = "Enter"
        answer.style.display = "none"
    }
    else if (viewed_colors.length + wrong_answers.length){
        // select randomly a color from viewed colors or wrong answered colors
        let rand_idx = Math.floor(Math.random() * (viewed_colors.length + wrong_answers.length))
        color = (rand_idx >= viewed_colors.length) ? wrong_answers[rand_idx - viewed_colors.length] : viewed_colors[rand_idx]
        // console.log(viewed_colors,wrong_answers,correct_answers,rand_idx,color)
        document.body.style.backgroundColor = color

        header.innerHTML = "Type in correct color: <br>"
        inputlabel.textContent = ""
        submit.textContent = "Enter"
        answer.style.display = "flex" // flex?
    }
    let rgb_color = window.getComputedStyle(document.body).backgroundColor
    const rbg_values = rgb_color.split("(")[1].split(")")[0].split(", ")
    let r = parseInt(rbg_values[0])
    let g = parseInt(rbg_values[1])
    let b = parseInt(rbg_values[2])
    bright = (r + g + b ) / 3 > 100
    const r_hex = r.toString(16).toUpperCase()
    const g_hex = g.toString(16).toUpperCase()
    const b_hex = b.toString(16).toUpperCase()
    hexcod.textContent = "#" + r_hex + g_hex + b_hex
    document.body.style.color = bright ? "black" : "white"
    
}