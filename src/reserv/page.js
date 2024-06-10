
import { useState, useRef, useEffect } from 'react';
// import { upload } from '@vercel/blob/client';
import { motion } from 'framer-motion';
import FieldsForm from './(apply)/FieldsForm';
import CategoriesForm from './(apply)/CategoriesForm';
import InformForm from './(apply)/InformForm';
import AttendForm from './(apply)/AttendForm';
import Q1Form from './(apply)/Q1Form';
import Q2Form from './(apply)/Q2Form';
import Q3Form from './(apply)/Q3Form';
import Q4Form from './(apply)/Q4Form';
import Q5Form from './(apply)/Q5Form';
import Q6Form from './(apply)/Q6Form';
import TermForm from './(apply)/TermForm';
import CompleteForm from './(apply)/CompleteForm';
import { getSignedURL } from './(model)/actions';

export default function Apply() {
  const [formData, setFormData] = useState({
    field: '',
    doctor: '',
    category: '',
    name: '',
    sex: '',
    birth: '',
    phone: '',
    email: '',
    grade: '',
    semester: '',
    attend: '',
    q1: '',
    Date: '', 
    Time: '',
    q3: '',
    q4Exp: null,
    q4: '',
    q5: '',
    q6File: '',
    informTerm: null,
    portfolioTerm: null,
  });

  const inputFileRef = useRef(null);
  const [blob, setBlob] = useState(null);
  const [currentStep, setCurrentStep] = useState(100 / 12);
  const [page, setPage] = useState(0);
  const [activeBtn, setActiveBtn] = useState(false);
  const [response, setResponse] = useState();
  const [file, setFile] = useState(undefined);
  const [fileUrl, setFileUrl] = useState(undefined);

  useEffect(() => {
    setActiveBtn(isPageValid(page));
  }, [page, formData]);

  function isPageValid(page) {
    switch (page) {
      case 0:
        return formData.field !== '';
      case 1:
        return formData.category !== '';
      case 2:
        return (
          formData.name !== '' &&
          formData.sex !== '' &&
          formData.birth !== '' &&
          formData.phone !== '' &&
          formData.email !== ''
        );
      case 3:
        return (
          formData.grade !== '' &&
          formData.semester !== '' &&
          formData.attend !== ''
        );
      case 4:
        return formData.q1 !== '';  
      case 5:
        return (
          formData.Date !== '' &&
          formData.Time !== ''
        )              
      case 6:
        return formData.q3 !== '';
      case 7:
        return formData.q4Exp !== null;
      case 8:
        return formData.q5 !== '';
      case 9:
        return true;
      case 10:
        return formData.informTerm === true && formData.portfolioTerm === true;
      default:
        return false;
    }
  }

  function PageDisplay() {
    if (page === 0) {
      return <FieldsForm setFormData={setFormData} formData={formData} />;
    } else if (page === 1) {
      return <CategoriesForm setFormData={setFormData} formData={formData} />;
    } else if (page === 2) {
      return <InformForm setFormData={setFormData} formData={formData} />;
    } else if (page === 3) {
      return <AttendForm setFormData={setFormData} formData={formData} />;
    } else if (page === 4) {
      return <Q1Form setFormData={setFormData} formData={formData} />;
    } else if (page === 5) {
      return <Q2Form setFormData={setFormData} formData={formData} />;
    } else if (page === 6) {
      return <Q3Form setFormData={setFormData} formData={formData} />;
    } else if (page === 7) {
      return <Q4Form setFormData={setFormData} formData={formData} />;
    } else if (page === 8) {
      return <Q5Form setFormData={setFormData} formData={formData} />;
    } 
    else if (page === 9) {
      return (
        <Q6Form
          setFormData={setFormData}
          formData={formData}
          setFile={setFile}
          file={file}
          setFileUrl={setFileUrl}
          fileUrl={fileUrl}
        />
      );
    } 
    else if (page === 10) {
      return <TermForm setFormData={setFormData} formData={formData} />;
    } else if (page === 11) {
      return <CompleteForm response={response} />;
    }
  }

  // async function computeSHA256(file) {
  //   const buffer = await file.arrayBuffer();
  //   const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  //   const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   const hashHex = hashArray
  //     .map((b) => b.toString(16).padStart(2, '0'))
  //     .join('');
  //   return hashHex;
  // }

  async function onSubmit(e) {
    e.preventDefault();
    const data = formData;
    setResponse(true);
    console.log(data);

    // try {
    //   if(file) {
    //     const checksum = await computeSHA256(file);
    //     const signedURLResult = await getSignedURL(file.type, file.size, checksum, formData.name);

    //     const url = signedURLResult.success.url;
    //     data.q6File = url.split('?')[0];
    //     await fetch(url, {
    //       method: 'PUT',
    //       body: file,
    //       headers: {
    //         'Content-Type' : file?.type,
    //       }
    //     })
    //   }
    // } catch(e) {
    //   console.error(e);
    // }

    fetch('http://127.0.0.1:8000/api/reserv/page', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
  };

  return (
    <div className="flex pt-[60px] md:pt-[105px] w-full justify-center">
      <div className="flex flex-col w-[60%] font-suit">
        <div className="flex justify-between text-5xl pt-20 leading-snug font-semibold text-[5vw] md:text-3xl xl:text-5xl">
          <span className="text-[#00B8FF]">RMDI</span>
          <span>온라인 예약하기</span>
        </div>

        {/* Form Step */}
        <div className="py-10">
          <div className="w-full h-[8px] bg-[#D9D9D9]">
            <motion.div
              initial={{
                width: 0,
              }}
              animate={{
                width: `${currentStep}%`,
              }}
              transition={{
                duration: 0.6,
              }}
              className="h-full bg-[#00B8FF]"
            />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={onSubmit} action="/">
          {PageDisplay()}
          <div
            className={`flex w-full justify-center md:justify-end  ${
              page === 11 ? 'justify-center' : 'justify-end'
            } font-pretend pt-10`}
          >
            <div
              className={`flex flex-row text-2xl pb-10 ${
                page === 11 ? 'space-x-0' : 'space-x-4'
              }`}
            >
              {page === 0 || page === 11 ? null : (
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep((currStep) => currStep - 100 / 12);
                    setPage((currPage) => currPage - 1);
                  }}
                  whileHover={{
                    backgroundColor: '#D6DBDF',
                  }}
                  className="text-[5vw] py-[2vw] px-[7vw] md:text-2xl md:py-3 md:px-14 rounded-full bg-[#E1E8ED] text-[#657786]"
                >
                  이전
                </motion.button>
              )}
              {page === 10 ? (
                <motion.button
                  type="submit"
                  onClick={(e) => {
                    setCurrentStep((currStep) => currStep + 100 / 12);
                    setPage((currPage) => currPage + 1);
                  }}
                  whileHover={{
                    backgroundColor: '#00ADF2',
                  }}
                  className="text-[5vw] py-[2vw] px-[7vw] md:text-2xl md:py-3 md:px-14 rounded-full bg-[#00B8FF] text-[#FFFFFF] disabled:opacity-45"
                  disabled={!activeBtn}
                >
                  제출
                </motion.button>
              ) : (
                <motion.button
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentStep((currStep) => currStep + 100 / 12);
                    setPage((currPage) => currPage + 1);
                  }}
                  whileHover={{
                    backgroundColor: '#00ADF2',
                  }}
                  className={`text-[5vw] py-[2vw] px-[7vw] md:text-2xl md:py-3 md:px-14 rounded-full bg-[#00B8FF] text-[#FFFFFF] disabled:opacity-45 ${
                    page === 11 ? 'hidden' : 'block'
                  }`}
                  disabled={!activeBtn}
                >
                  다음
                </motion.button>
              )}
              {page === 11 && (
                <button
                  whileHover={{
                    backgroundColor: '#00ADF2',
                  }}
                  className="text-[5vw] py-[2vw] px-[7vw] md:text-2xl md:py-3 md:px-14 rounded-full bg-[#00B8FF] text-[#FFFFFF]"
                  onClick={(e) => {
                    e.preventDefault();
                    window.console.log(formData)
                    window.location.href ='/';
                  }}
                >
                  완료
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}