//Get the UI elements
let select = document.querySelector('#option');
let selectArr = Array.from(select.children);

select.addEventListener('change', function(){
    if(this.value != ''){
        let regExp;
        let value = parseInt(this.value);
        let inputField = prompt('Enter what you want to validate.');

        if(inputField!=null){
            switch(value){
                case 1:
                    regExp = /^([a-zA-Z0-9]\.?)+[^\.](@){1,1}([a-zA-Z0-9]\.?)+[^\.]$/;
                    showMsg(1, regExp.test(inputField), inputField);
                    break;
                case 2:
                    regExp = /^(\+)?(88)?01[^012]([0-9]){8}$/; //According to Bangladeshi mobile operators
                    showMsg(2, regExp.test(inputField), inputField);
                    break;
                case 3:
                    if(!isNaN(parseInt(inputField))) inputField = parseInt(inputField);

                    regExp = /^([0-9]){4}$/;
                    showMsg(3, regExp.test(inputField), inputField);
                    break;
                case 4:
                    regExp = /^(https?:\/\/)(www\.)?([a-zA-Z0-9]+\.)?[a-zA-Z0-9]+(\.[a-zA-Z]+){1,2}$/;
                    //http://www.website.com
                    //https://www.website.com
                    //http://website.com
                    //http://www.website.com.bd
                    //http://www.subdomain.website.com
                    //http://www.subdomain.website.com.bd
                    showMsg(4, regExp.test(inputField), inputField);
                    break;
            }
        }else{
            select.children[0].setAttribute('selected', '');
        }
    }
});

function showMsg(caseValue, bool, input){
    let msgClass;
    let msg;
    if(bool){
        msgClass='success';
        msg = '<b>Success.</b> ';
        if(caseValue==1){
            msg += `'${input}' is a valid email.`;
        }else if(caseValue==2){
            msg += `'${input}' is a valid phone number.`;
        }else if(caseValue==3){
            msg += `'${input}' is a valid post code.`;
        }else if(caseValue==4){
            msg += `'${input}' is a valid URL.`;
        }
    }else{
        msgClass='error';
        msg = '<b>Error! </b>';
        if(caseValue==1){
            msg += `'${input}' is not a valid email.`

        }else if(caseValue==2){
            msg += `'${input}' is not a valid phone number.`

        }else if(caseValue==3){
            msg += `'${input}' is not a valid post code.`

        }else if(caseValue==4){
            msg += `'${input}' is not a valid URL.`;
        }
    }
    overlay(msgClass, msg);
}

function overlay(className, msg){
    let body = document.querySelector('body');
    let h2 = document.createElement('h2');
    let section = document.querySelector('section');
    body.insertBefore(h2, section);
    let div = document.createElement('div');
    div.className = 'overlay';
    body.appendChild(div);
    setTimeout(()=>{
        div.style.opacity = '1';
        h2.className = className;
        h2.innerHTML = msg;
    }, 100);

    setTimeout(()=>{
        div.style.opacity = '0';
        h2.classList.remove(className);
    }, 3000);

    setTimeout(()=>{
        div.remove();
        h2.remove();
    }, 3500);

    selectArr.forEach(value=>{
        if(value.hasAttribute('selected')){
            value.removeAttribute('selected');
        }
    });
    selectArr[0].setAttribute('selected', '');
}