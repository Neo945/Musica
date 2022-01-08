import { useEffect, useState } from "react";

function RegistrationForm(props) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    age: "",
    lang: ["English"],
    genre: ["Rock"],
    type: "Single",
  });
  return (
    <>
      <div className="register">
        {!loading ? <div style={{ position: "absolute" }}>Loading</div> : null}
        <form
          method="POST"
          action="/"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
          }}
        >
          <label htmlFor="profile">Profile photo: </label>
          <input
            type="file"
            id="profile"
            name="profile"
            onChange={(event) => setFile(event.target.files[0])}
          />
          {file ? <img src={URL.createObjectURL(file)} alt="" /> : null}
          <br />
          <input
            name="username"
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(event) =>
              setFormData({ ...formData, username: event.target.value })
            }
          />
          <br />
          <input
            name="phone"
            type="tel"
            placeholder="Phone No."
            value={formData.phone}
            onChange={(event) =>
              setFormData({ ...formData, phone: event.target.value })
            }
          />
          <br />
          <input
            name="age"
            type="number"
            placeholder="Age"
            onChange={(event) =>
              setFormData({ ...formData, age: event.target.value })
            }
            value={formData.age}
          />
          <br />
          <br />
          <div> Selected Language </div>
          {formData.lang.map((ele, i) => (
            <div
              onClick={() =>
                setFormData({
                  ...formData,
                  lang: formData.lang.filter((listEle) => listEle != ele),
                })
              }
              style={{ cursor: "pointer" }}
              key={i}
            >
              {ele}
            </div>
          ))}
          <label htmlFor="lang">Language: </label>
          <select
            name="language"
            id="lang"
            onChange={(event) =>
              !formData.lang.includes(event.target.value)
                ? setFormData({
                    ...formData,
                    lang: [...formData.lang, event.target.value],
                  })
                : null
            }
          >
            {["English", "Hindi", "Spanish"].map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
          <br />
          <br />
          <div> Type of Artist </div>
          <div>{formData.type}</div>
          <label htmlFor="type">Type: </label>
          <select
            name="type"
            id="type"
            onChange={(event) =>
              setFormData({ ...formData, type: event.target.value })
            }
          >
            {["Single", "Duo", "Trio", "Band", "Song writer"].map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
          <br />
          <br />
          <div> Select Prefered Language </div>
          {formData.genre.map((ele, i) => (
            <div
              onClick={() =>
                setFormData({
                  ...formData,
                  genre: formData.genre.filter((listEle) => listEle != ele),
                })
              }
              style={{ cursor: "pointer" }}
              key={i}
            >
              {ele}
            </div>
          ))}
          <label htmlFor="gnere">Genre: </label>
          <select
            name="language"
            id="genre"
            onChange={(event) =>
              !formData.genre.includes(event.target.value)
                ? setFormData({
                    ...formData,
                    genre: [...formData.genre, event.target.value],
                  })
                : null
            }
          >
            {["Dubstep", "EDM", "Rock"].map((ele, i) => (
              <option key={i} value={ele}>
                {ele}
              </option>
            ))}
          </select>
          <br />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}

export default RegistrationForm;
