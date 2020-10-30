const wrapper = document.querySelector('#cafe-list');

const appendElement = (doc) => {

    const li = document.createElement('li');
    const title = document.createElement('span');
    const text = document.createElement('span');
    const cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    const data = doc.data();
    title.innerText = data.name;
    text.innerText = data.city;
    cross.innerText = 'x';

    li.appendChild(title);
    li.appendChild(text);
    li.appendChild(cross);

    cross.addEventListener('click', (e) => {
        const id = e.target.parentElement.getAttribute('data-id');
        /* delete a document with specific id */
        db.collection('cafes').doc(id).delete();
    });

    wrapper.appendChild(li);
}

const form = document.querySelector('#add-cafe-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    });

    form.name.value = '';
    form.city.value = '';

    //document.getElementById("cafe-list").innerHTML = "";

});

/* use docChanges to liste with onSnapshot for every changes in collection */
/* every doc in docChanges has a type associated */
db.collection('cafes').onSnapshot((snapshot) => {
    const changes = snapshot.docChanges();
    console.log(changes);

    changes.forEach(change => {
        console.log(change.doc.id);
        if (change.type === 'added') {
            appendElement(change.doc);
        } else if (change.type === 'removed') {
            let li = document.querySelector(`[data-id=${change.doc.id}]`);
            wrapper.removeChild(li);
        }
    });
});

/* to modify data */
/* with update it changes only the elements specified */
db.collection('cafes').doc('C8Rp6GH1lEfNdZ9ZmEeP').update({ city: 'New York' })
db.collection('cafes').doc('C8Rp6GH1lEfNdZ9ZmEeP').update({ name: 'Cafe Albero' })

/* with SET we overwrite all values - if not presents there are setted to nothing */
//db.collection('cafes').doc('C8Rp6GH1lEfNdZ9ZmEeP').set({ city: 'New York' })

// db.collection('cafes').onSnapshot((snapshot) => {
//     document.getElementById("cafe-list").innerHTML = "";

//     snapshot.forEach(doc => {
//         appendElement(doc);
//     });
// });

// db.collection('cafes').where('city', '==', 'Paris 11').orderBy('name').onSnapshot((snapshot) => {
//     document.getElementById("cafe-list").innerHTML = "";

//     snapshot.forEach(doc => {
//         appendElement(doc);
//     });
// });


// get collection reference db.collection('name').get()
// get() return a promise and when resolved a snapshot of the current state of the db
// get data from documents : doc.data()

// methods:
// .where() ---- ex: .where("state", "==", "CA")
// .orderBy('name') -----> IMPORTANT: uppercase letters are ordered before lovercase letters
// if we want to use both selection methods we have to create an index in firestore dashboard