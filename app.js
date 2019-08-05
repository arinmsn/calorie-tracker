// Storage Controller

// Item Controller
const ItemCtrl = (function() {
    const Item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
   }

   // Data structur e (state)
   const data = {
       items: [
            {id:0, name: 'Steak Dinner', calories: 1200},
            {id:1, name: 'Shake', calories: 750},
        ],
       currentItem: null, // when specific item is selected
       totalCalories: 0
   }

   // Public access
   return {
       logData: function() {
           return data;
       }
   }
})();

// UI Controller
const UICtrl = (function() {
   
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
        // Public access
        return {
        init: function(){
           console.log('Initializing app...')
        }
   }
})(ItemCtrl, UICtrl);

// Initializing app
App.init();