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
       getItems: function() {
           return data.items;
       },
       logData: function() {
           return data;
       }
   }
})();

// UI Controller
const UICtrl = (function() {
    const UISelectors = {
        itemList: '#item-list'
    }

    // Public access
    return {
        populateItemList: function(items){
            let html = '';
            items.forEach(function(item){
                html += `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
                </li>
                `;
            });

            // Insert items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        }
    }
})();

// App Controller
const App = (function(ItemCtrl, UICtrl) {
        // Public access
        return {
        init: function(){
           // Fetch items from data structure
           const items = ItemCtrl.getItems();
           
           // Populate list
           UICtrl.populateItemList(items);
        }
   }
})(ItemCtrl, UICtrl);

// Initializing app
App.init();