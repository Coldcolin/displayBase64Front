import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios"

function AppUI() {
  const [base64code, setBase64code] = useState("");
  const [data, setData] = useState()

  const yupModel = yup.object().shape({
    name: yup.string().required("This is required"),
  });
  const {register, reset, handleSubmit, formState:{errors}} =
  useForm({resolver: yupResolver(yupModel)});

  const submitForm = handleSubmit (async (data)=>{
    try{
      const {name}= data;
      await axios.post("http://localhost:5000/api/post", {name: name, image: base64code})
      reset()
    }catch(error){
      if (error.response) {
        console.log(error.response.data.message)
        console.log(error.response.status);
        console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
      console.log(error.config)
    }
  })

const onChange = (e)=>{
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () =>{
    onLoad(reader.result);
  };
  reader.onerror = (error)=>{
    console.log("error:", error)
  }
}

const onLoad =(fileString)=>{
  setBase64code(fileString)
}


const getCandidate = async()=>{
    try{
        const res = await axios.get("http://localhost:5000/api/get")
    setData(res.data.data);
    console.log(res.data.data)
      }catch(error){
        if (error.response) {
          console.log(error.response.data.message)
          console.log(error.response.status);
          console.log(error.response.headers);
          } else if (error.request) {
              console.log(error.request);
              } else {
                console.log('Error', error.message);
              }
        console.log(error.config)
      }
  }

  useEffect(()=> {
    getCandidate()
  }, [])

  return (
    <Container>
      <Wrapper>
        <Sender onSubmit={submitForm}>
            <Label htmlFor="picture">Upload Image</Label>
            <Input type="file" id="picture" onChange={onChange}/>
            <Input2 type="text" placeholder="name" {...register("name")}/>
            <button type="submit">Submit</button>
        </Sender>
        <Reciever>
            <Items>
                <Show/>
                {
                  data?.map((props)=>(
                    <div key={props._id}>
                        <div>{props.name}</div>
                        <img src={props.image} alt="image will"/>
                    </div>
                  ))
               }
            </Items>
        </Reciever>
      </Wrapper>
    </Container>
  );
}

export default AppUI;

const Container = styled.div``
const Wrapper = styled.div``
const Sender = styled.form``
const Reciever = styled.div``
const Collect = styled.img``
const Label = styled.label``
const Input = styled.input``
const Input2 = styled.input``
const Items = styled.div``
const Show = styled.img``
const Name = styled.textarea``
