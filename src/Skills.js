import { ReactComponent as BackArrow } from "./assets/BioA/chevron-left.svg";
import { useState } from "react";
import { ReactComponent as DeleteIcon } from "./assets/BioA/trash-icon.svg";

export default function Skills(props) {
  console.log("props", props);

  const [aboutMe, setAboutMe] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [resume, setResume] = useState({});
  const [formData, setFormData] = useState("");
  const [isEdit, setIsEdit] = useState(props.isEdit);
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState("");
  const [saveDisable, setSaveDisable] = useState(true);

  const getAboutMe = (e) => {
    console.log(e.target.value);
    setAboutMe(e.target.value);
  };

  const getBloodGroup = (e) => {
    console.log(e.target.value);
    setBloodGroup(e.target.value);
  };

  const uploadCV = (e) => {
    // const cv = document.getElementById("cv").files;
    const file = document.getElementById("pdfFile").files[0];

    // Create a new FileReader
    const reader = new FileReader();

    // Set up the onload event handler to display the PDF content
    reader.onload = function (event) {
      const pdfContent = event.target.result;
      props.setPdfContent(pdfContent);
      setName(file.name);
      document.getElementById("pdfViewer").innerHTML =
        '<embed src="' +
        pdfContent +
        '" type="application/pdf" width="100%" height="100px"/>';
    };

    // console.log("file: " + JSON.stringify(file))
    // Read the selected file as a data URL
    reader.readAsDataURL(file);
    // const fileName = cv.files[0].name;
    // console.log("cv", cv);
    setSaveDisable(false);
    document.getElementById("btnSave").style.backgroundColor = "#E72D38";
    setResume(file);
  };

  const save = () => {
    let obj = {
      aboutMe,
      bloodGroup,
      resume,
    };
    setFormData({
      ...obj,
    });
    let edit = !isEdit;
    // sessionStorage.setItem("bioData", obj);
    props.setIsEdit(edit);
    props.getFormData(obj);

    // window.location.href="/"
  };

  const deleteResume = () => {
    setIsOpen(true);
  };

  return (
    <div className="position-relative  w-100 h-100">
      <div className="mb-4 fw-normal">
        <span className="px-2">
          {/* <BackArrow onClick={(isEdit) => goBack(isEdit)} /> */}
        </span>
        Skills
      </div>
      <div className="aboutme-title">
        <h6>Write something about yourself?</h6>
      </div>
      <div className="mb-2">
        <textarea
          className="textarea"
          onChange={(e) => getAboutMe(e)}
          rows="5"
          cols="40"
        ></textarea>
        <p className="count-div">
          <p>0/500</p>
        </p>
      </div>
      <div class="card shadow b-1 card-bg">
        <div id="pdfViewer"></div>
        <div class="card-body">
          <input type="file" id="pdfFile" onChange={() => uploadCV()} />
        </div>
      </div>
      <div className="delete-container">
        <span>{name}</span>
        <DeleteIcon onClick={() => deleteResume()} />
      </div>
      <div className="my-3">
        <h6>Blood group</h6>

        <select
          id="select1"
          className="blood-group-dropdown"
          onClick={(e) => getBloodGroup(e)}
          placeholder="Select Blood Group"
        >
          <option value="Select Bloodgroup">
            <p>Select Blood Group</p>
          </option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="O">O</option>
        </select>
      </div>

      <div className="save-btn-div">
        <button
          disabled={saveDisable}
          // type="button"
          id="btnSave"
          className="save-btn"
          onClick={() => save()}
        >
          Save
        </button>
      </div>

      <div class="modal" tabindex="-1" data-bs-toggle="modal" id="modal">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
