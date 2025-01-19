define ([], ()=> {
    'use strict';

    return custom2 => {
       return  custom2.extend({
           onTextUpdate() {
               console.log('Update text mixin');
           }
       })
    }
})