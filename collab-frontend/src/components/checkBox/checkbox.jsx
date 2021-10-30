import "./checkbox.css"

let CheckBox=()=>{

    return (
        <div class="container">
        
        <div class="items">
            <input id="item1" class="cc" type="checkbox" checked/>
            <label for="item1"  class="ccl" >Create a to-do list</label>

            <input id="item2" class="cc" type="checkbox"/>
            <label for="item2"  class="ccl" >Take down Christmas tree</label>

            <input id="item3" class="cc" type="checkbox"/>
            <label for="item3"  class="ccl" >Learn Ember.js</label>

            <input id="item4" class="cc" type="checkbox"/>
            <label for="item4"  class="ccl" >Binge watch every episode of MacGyver</label>

            <input id="item5"  class="cc" type="checkbox"/>
            <label for="item5"  class="ccl" >Alphabetize everything in the fridge</label>

            <input id="item6" class="cc" type="checkbox"/>
            <label for="item6" class="ccl" >Do 10 pull-ups without dropping</label>

            <input id="item7" class="cc" type="checkbox"/>
            <label for="item7"  class="ccl" >Write 100 sentence with would</label>

            <input id="item8" class="cc" type="checkbox"/>
            <label for="item8"  class="ccl" >Do 10 pull-ups without dropping</label>

            <h2 class="done" aria-hidden="true">Done</h2>
            <h2 class="undone" aria-hidden="true">Not Done</h2>
            
        </div>
        </div>
    )
   

}

export default CheckBox;