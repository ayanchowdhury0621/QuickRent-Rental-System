import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { imgStorage, docStorage } from "./config/firebase_storage";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";

function AddRentals() {
  const [rentalName, setRentalName] = useState("");
  const [rentalDescription, setRentalDescription] = useState("");
  const [rentalCategory, setRentalCategory] = useState("");
  const [rentalZip, setRentalZip] = useState(0);
  const [rentalPrice, setRentalPrice] = useState(0);

  const [imgUpload, setImgUpload] = useState(null);
  const [imgUrl, setImgUrl] = useState("");

  const uploadImg = () => {
    if (imgUpload === null) return;

    const imgRef = ref(imgStorage, `images/${v4()}`);
    const uploadTask = uploadBytesResumable(imgRef, imgUpload);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
        }
        // need to let the user know when the upload finishes
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImgUrl(downloadURL);
        });
      }
    );
  }

  const handleClick = async (e) => {
    e.preventDefault();
    const docRef = collection(docStorage, "rentals");
    await addDoc(docRef, {
      rental_name: rentalName,
      rental_description: rentalDescription,
      rental_price: rentalPrice,
      rental_category: rentalCategory,
      rental_zip: rentalZip,
      img_url: imgUrl,
    });
    // console.log(docRef.id);
    alert("Rental Added");
    setRentalName("");
    setRentalDescription("");
    setRentalPrice(0);
    setRentalCategory("");
    setRentalZip("");
    setImgUrl("");
  };

  return (
    <div className="addRental">
      <h1>Add Rental</h1>
      <label>Rental Name </label> <br />
      <input
        type="text"
        value={rentalName}
        onChange={(e) => setRentalName(e.target.value)}
      />{" "}
      <br />
      <label>Rental Category </label> <br />
      <select
        value={rentalCategory}
        onChange={(e) => setRentalCategory(e.target.value)}
      >
        <option value="">Select category</option>
        <option value="category1">Electronics</option>
        <option value="category2">Clothing</option>
        <option value="category3">Books</option>
      </select>{" "}
      <br />
      <label>Rental Description </label> <br />
      <input
        type="text"
        value={rentalDescription}
        onChange={(e) => setRentalDescription(e.target.value)}
      />{" "}
      <br />
      <label>Rental Price </label>
      <br />
      <input
        type="number"
        value={rentalPrice}
        onChange={(e) => setRentalPrice(e.target.value)}
      />
      <br />
      <label>Zip Code </label>
      <br />
      <input
        type="text"
        value={rentalZip}
        onChange={(e) => setRentalZip(e.target.value)}
      />
      <br />
      <input type="file" onChange={(e) => { setImgUpload(e.target.files[0]) }} />
      <button onClick={uploadImg}>Upload</button> <br />
      <button onClick={handleClick}>Add</button>
    </div>
  );
}

export default AddRentals;
