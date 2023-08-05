import React, { useEffect, useState } from "react";
import "./Bio.css";
import { ReactComponent as BackArrow } from "./assets/BioA/chevron-left.svg";
import { ReactComponent as ForwardArrow } from "./assets/BioA/chevron-right.svg";
import { ReactComponent as EditIcon } from "./assets/BioA/edit-icon.svg";
import EditBio from "./EditBio";
import { Outlet, Link } from "react-router-dom";
import Skills from "./Skills";

export default function MyBioScreen() {
  const [isEdit, setIsEdit] = useState(false);
  const [bioData, setBioData] = useState([]);
  const [isEditSkills, setIsEditSkills] = useState(false);
  const [source, setSource] = useState("");
  const [professionalSkills, setProfessionalSkills] = useState([]);
  const [hobbies, setHobbies] = useState([]);
  // const [professionalSkills, setProfessionalSkills] = useState([]);

  const getProfessionalSkills = async () => {
    const response = await fetch(
      "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetProfessionalSkillsResponse.json"
    );
    setProfessionalSkills(response.result);
    console.log(response);
  };
  const getHobbies = async () => {
    const response = await fetch(
      "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetHobbiesResponse.json"
    );
    setHobbies(response.result);
    console.log(response);
  };
  // const getProfessionalSkills = async () => {
  //   const response = await fetch(
  //     "https://newpublicbucket.s3.us-east-2.amazonaws.com/reactLiveAssignment/JsonFiles/GetProfessionalSkillsResponse.json"
  //   );
  //   console.log(response);
  // };

  useEffect(() => {
    getProfessionalSkills();
    getHobbies();
  });

  const setUrl = (pdfContent) => {
    setSource(pdfContent);
  };

  const openEditBio = () => {
    setIsEdit(true);
  };

  const openEditSkills = () => {
    setIsEditSkills(true);
  };

  const editBio = (isEdit) => {
    console.log("isEdit", isEdit);
    setIsEdit(isEdit);
    // window.location.href = "/edit";
  };

  const setBio = (FormData) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      // const pdfContent = event.target.result;
      document.getElementById("pdfViewer").innerHTML =
        '<embed src="' +
        source +
        '" type="application/pdf" width="100%" height="100px"/>';
    };

    reader.readAsDataURL(FormData.resume);
    setBioData([FormData]);
    // setBioData()
  };

  const goBack = (isEdit) => {
    let edit = !isEdit;
    setIsEdit(edit);
    // window.location.href = "/";
  };

  return (
    <div className="Bio-screen-div">
      <div className="mb-4 fw-normal">
        <span className="px-2">
          <BackArrow onClick={(isEdit) => goBack(isEdit)} />
        </span>
        My Bio
      </div>
      {isEdit === false && isEditSkills === false ? (
        <div>
          {bioData.length === 0 ? (
            <div>
              <div className="aboutme-title">
                <h6>About Me</h6>
                <span>
                  <EditIcon onClick={() => openEditBio()} />
                </span>
              </div>
              <div className="mb-4">
                <p className="textarea-container">No about me added yet </p>
              </div>
              <div className="aboutme-title mb-3">
                <h6>Blood group</h6>
                <p>Select</p>
              </div>
              <div class="card shadow">
                <div class="card-body">
                  {/* <div id="pdfViewer" style={{ height: "100px" }}></div> */}
                  <div className="resume-div">
                    <div>
                      <img
                        src="https://c8.alamy.com/comp/2AHN70D/modern-resume-design-2AHN70D.jpg"
                        className="resume-icon"
                      />
                      <span className="resume-font">Resume</span>
                    </div>
                    <span className="fwd-arr">
                      {" "}
                      <ForwardArrow />
                    </span>
                  </div>
                </div>
              </div>
              <hr />
              <div>
                <div className="aboutme-title">
                  <h6>Skills</h6>
                  <span>
                    <EditIcon onClick={() => openEditSkills()} />
                  </span>
                </div>
                <div className="mb-4">
                  <p className="textarea-container">
                    No soft skills added yet{" "}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                {bioData &&
                  bioData.map((item) => {
                    return (
                      <div>
                        <div className="aboutme-title">
                          <h6>About Me</h6>
                          <span>
                            <EditIcon onClick={(isEdit) => editBio(isEdit)} />
                          </span>
                        </div>
                        <div className="mb-4">
                          <div className="textarea-container">
                            {item?.aboutMe}
                          </div>
                        </div>
                        <div className="aboutme-title mb-3">
                          <h6>Blood group</h6>
                          <p>{item.bloodGroup}</p>
                        </div>
                        <div class="card shadow">
                          <div class="card-body">
                            <div
                              id="pdfViewer"
                              style={{ height: "100px" }}
                            ></div>
                            <ForwardArrow />
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      ) : isEdit === true && isEditSkills === false ? (
        <EditBio
          bioData={bioData}
          getFormData={(FormData) => setBio(FormData)}
          isEdit={isEdit}
          setIsEdit={(isEdit) => editBio(isEdit)}
          setPdfContent={(source) => setUrl(source)}
        />
      ) : (
        <Skills />
      )}
    </div>
  );
}
