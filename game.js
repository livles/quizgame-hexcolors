let colors = ['black', 'navy', 'darkblue', 'mediumblue', 'blue', 'darkgreen', 'green', 'teal', 'darkcyan', 'deepskyblue', 'darkturquoise', 'mediumspringgreen', 'lime', 'springgreen', 'aqua', 'cyan', 'midnightblue', 'dodgerblue', 'lightseagreen', 'forestgreen', 'seagreen', 'darkslategray', 'darkslategrey', 'limegreen', 'mediumseagreen', 'turquoise', 'royalblue', 'steelblue', 'darkslateblue', 'mediumturquoise', 'indigo', 'darkolivegreen', 'cadetblue', 'cornflowerblue', 'rebeccapurple', 'mediumaquamarine', 'dimgray', 'dimgrey', 'slateblue', 'olivedrab', 'slategray', 'slategrey', 'lightslategray', 'lightslategrey', 'mediumslateblue', 'lawngreen', 'chartreuse', 'aquamarine', 'maroon', 'purple', 'olive', 'gray', 'grey', 'skyblue', 'lightskyblue', 'blueviolet', 'darkred', 'darkmagenta', 'saddlebrown', 'darkseagreen', 'lightgreen', 'mediumpurple', 'darkviolet', 'palegreen', 'darkorchid', 'yellowgreen', 'sienna', 'brown', 'darkgray', 'darkgrey', 'lightblue', 'greenyellow', 'paleturquoise', 'lightsteelblue', 'powderblue', 'firebrick', 'darkgoldenrod', 'mediumorchid', 'rosybrown', 'darkkhaki', 'silver', 'mediumvioletred', 'indianred', 'peru', 'chocolate', 'tan', 'lightgray', 'lightgrey', 'thistle', 'orchid', 'goldenrod', 'palevioletred', 'crimson', 'gainsboro', 'plum', 'burlywood', 'lightcyan', 'lavender', 'darksalmon', 'violet', 'palegoldenrod', 'lightcoral', 'khaki', 'aliceblue', 'honeydew', 'azure', 'sandybrown', 'wheat', 'beige', 'whitesmoke', 'mintcream', 'ghostwhite', 'salmon', 'antiquewhite', 'linen', 'lightgoldenrodyellow', 'oldlace', 'red', 'fuchsia', 'magenta', 'deeppink', 'orangered', 'tomato', 'hotpink', 'coral', 'darkorange', 'lightsalmon', 'orange', 'lightpink', 'pink', 'gold', 'peachpuff', 'navajowhite', 'moccasin', 'bisque', 'mistyrose', 'blanchedalmond', 'papayawhip', 'lavenderblush', 'seashell', 'cornsilk', 'lemonchiffon', 'floralwhite', 'snow', 'yellow', 'lightyellow', 'ivory', 'white']
let viewed_colors = []
let count = -1
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
let starttime = 0, duration = 0,averageduration = 0;

// enter has same effect as submit button   
document.addEventListener("keydown",(e) =>   {
    if (e.code == "Enter") {
        submit.click();
    }
})

submit.onclick = function () {
    if (starttime) {
        duration = performance.now() - starttime
    }
    starttime = performance.now();
    const text = answer.value; 
    submitanswer.textContent = text
    
    if (count) {
        averageduration = ((count-1) * averageduration + duration) / count
    }
    answer.value = ""
    let color = document.body.style.backgroundColor
    if (index >= 0) {
        if (index < 4 && colors.length && viewed_colors.length < 4) {
            viewed_colors.push(color)
            colors.splice(colors.indexOf(color),1)
        } else if (viewed_colors.length){
            count ++;
            console.log(color)
            if (text == color){
                right_answers++;
                submitanswer.textContent = color + " was correct!" 
                viewed_colors.splice(viewed_colors.indexOf(color),1)
                if (right_answers == 148) {
                    alert("you have answered all colors correctly once.")
                }
            } 
            else {
                submitanswer.textContent = "Expected: " + color + ", but was: " + text
            }
            footer.textContent = "correct answers: " + right_answers + " out of " + count + " with average answer time: " + (averageduration / 1000).toFixed(2)  + " s."
        } 
    }
    
    index = ( index + 1 ) % 8
    if (index < 4 && colors.length && viewed_colors.length < 4) {
        color  = colors[Math.floor(Math.random() * colors.length)];
        document.body.style.backgroundColor = color;
        header.innerHTML = "Learn new HTML color: <br>" 
        inputlabel.textContent = "New color: " + document.body.style.backgroundColor
        submit.textContent = "Enter"
        answer.style.display = "none"
    }
    else if (viewed_colors.length){
        document.body.style.backgroundColor = viewed_colors[Math.floor(Math.random() * viewed_colors.length)];
        header.innerHTML = "Type in correct color: <br>"
        inputlabel.textContent = ""
        submit.textContent = "Enter"
        answer.style.display = "inline-block"
    }
}