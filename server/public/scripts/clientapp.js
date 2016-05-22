
var completion = {};
var cocojambocheck = false;

//When the document is ready the lists are built from the database, and then event listeners are attached.
$(document).ready(function() {
    addListItems();
    $('#submit').on('click', postItem);
    $('.todo-items').on('click', '.delete', deleteItem);
    $('.todo-items').on('click', '.update', updateStatus);
});

function addListItems() {

  //Variables and fields are reset.
  var vaporwavecheck = false;
    $('#todo-items-complete').empty();
    $('#todo-items-incomplete').empty();

    //An ajax call is sent to the server for the table rows stored in todo.
    $.ajax({
        type: 'GET',
        url: '/todo',
        success: function(items) {

          //Each item is appended to the DOM in its own table row.
            items.forEach(function(item) {
                $container = $('<tr></tr>');
                var itemProperties = ['name', 'description'];
                itemProperties.forEach(function(prop) {
                    var $el = $('<td>' + item[prop] + '</td>');
                    $container.append($el);
                });

                //The container takes on some data for later logic use.
                $container.data('itemID', item.id);
                $container.data('name', item.name);
                $container.data('complete', item.complete);

                //The program checks your A E S T H E T I C
                if (item.name == 'v a p o r w a v e') {
                    setVaporwave();
                    vaporwavecheck = true;
                } else if (vaporwavecheck === false) {
                    setNormal();
                }

                //If the list item has been completed it is stored in the bottom table. Otherwise it is in the top table.
                if (item.complete) {
                    $container.append('<td>Complete</td><td><button class="unfinished update">Set to Incomplete</button></td>');
                    $container.addClass('complete');
                    $container.append('<td><button class="delete">Delete Task</button></td>');
                    $('#todo-items-complete').append($container);

                } else {
                    $container.append('<td>Incomplete</td><td><button class="finished update">Set to Complete</button></td>');
                    $container.addClass('incomplete');
                    $container.append('<td><button class="delete">Delete Task</button></td>');
                    $('#todo-items-incomplete').append($container);

                }
            });
        }
    });
}

//This function sends a to-do list item to the server to be stored in the database.
function postItem() {
    event.preventDefault();

    var item = {};

//The fields' information is put into an object.
    $.each($('#taskform').serializeArray(), function(i, field) {
        item[field.name] = field.value;

    });

//The ajax call sends the object to the server. If it is successful, it re-draws the tables.
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: item,
        success: function(data) {
            addListItems();
        }
    });
}

//This function deletes a to-do list item from the database.
function deleteItem() {
    event.preventDefault();

    //The task's name and ID are fetched. The user is asked if they are sure they want to delete that task.
    var $name = $(this).closest('tr').data('name');
    var itemID = $(this).closest('tr').data('itemID');
    var delTask = confirm('Are you sure you want to delete ' + $name + '?');

    //If the user confirmed their decision, the ajax call is run.
    if (delTask === true) {

        $.ajax({
            type: 'DELETE',
            url: '/todo/' + itemID,
            success: function() {
                addListItems();
            }
        });
    }
}

//This function updates the completion status of a given to-do list item.
function updateStatus() {
    event.preventDefault();

    //This if statement checks to see the completion status, and tells the server to alter it to the opposite status.
    if ($(this).closest('tr').hasClass('incomplete')) {
        completion.value = true;
    } else {
        completion.value = false;
    }
    var itemID = $(this).closest('tr').data('itemID');

    //This ajax call sends a put request to the server, and then re-draws the tables on success.
    $.ajax({
        type: 'PUT',
        url: '/todo/' + itemID,
        data: completion,
        success: function() {
            addListItems();
        }
    });
}

//Brings the user back to the 90s
function setVaporwave() {
    $('#stylesheet').attr('href', '../assets/styles/vaporwave.css');
    $('#name').attr('placeholder', 'A E S T H E T I C');
    $('#description').attr('placeholder', 'い㠤のぽ勯 はれ䧨䥜蛣 ウェしマぴゃゐ や饵 褦䰧䨵, 饨餣租 ぞ廩绣礯睥 じゅ禨そ駣ひゅ 勯げ ぐひょ ゑ媯は い㠤のぽ勯 杩褦䰧䨵せ µに䦌ゑ媯 䥦ウェ 짦解綩 詩鰧穤ぬ妥 奟にゃみゅ基ぴゅ 䏦涥 ば㣌期 もご榯绨壪 う樦ぢゅ蝣お 詩鰧穤ぬ妥, 䨵せ ディ椺獧 ぎょむづ囥䦎 姟覦㠣ど穟 ぢ亜ぱよ愥 갣簯杯きゅ詪 䥞ほ ピち埨, 勯げ 解綩や饵䰯 う樦ぢゅ蝣お びゃきょろ揣ピャ たじ榚, ゔちゃ くびゅ䥵ぺシェ 騪ぶ訧盨け 穤ぬ妥 ゔちゃ 姟覦㠣ど穟 じゃ鎌裌檧ミョ きゅ詪も, ば㣌期ぐひょ 穯騌ひゃ楃椧 ど穟韩 ツェ壎');
    if (cocojambocheck === false) {
        cocojambo = new Audio('../assets/audio/cocojambo.mp3');
        cocojambo.loop = true;
        cocojambo.play();
        cocojambocheck = true;
    }
}

//Brings the user back to the present
function setNormal() {
    $('#stylesheet').attr('href', '../assets/styles/main.css');
    $('#name').attr('placeholder', 'Peachpuff');
    $('#description').attr('placeholder', 'Paint the world in #FFDAB9.');
}
