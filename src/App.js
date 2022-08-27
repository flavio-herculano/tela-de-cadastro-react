import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { Button, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export function BasicDatePicker() {
  const [value, setValue] = React.useState(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        label="Data de Nascimento"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
          console.log(newValue.$d);
        }}
        renderInput={(params) => <TextField variant="filled" {...params} />}
      />
    </LocalizationProvider>
  );
}

function App() {
  const { register, setValue, handleSubmit, setFocus } = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        register();
        setValue("address", data.logradouro);
        setValue("neighborhood", data.bairro);
        setValue("city", data.localidade);
        setValue("uf", data.uf);
        setFocus("addressNumber");
      });
  };

  return (
    <>
      <header className="container">
        <a className="logo" href="##">
          SIL SOLUTIONS
        </a>
        <p className="subtitle">Sistema Inteligente para Laboratórios</p>
      </header>

      <section className="section">
        <h1 className="title">CADASTRO</h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid">
            <TextField
              id="filled-basic"
              label="Nome"
              variant="filled"
              {...register("name")}
            />
            <TextField
              id="filled-basic"
              label="Sobrenome"
              variant="filled"
              {...register("lastname")}
            />
            <BasicDatePicker></BasicDatePicker>

            <TextField
              id="filled-basic"
              label="CPF"
              variant="filled"
              {...register("cpf")}
            />
            <TextField
              id="filled-basic"
              label="RG"
              variant="filled"
              {...register("RG")}
            />
          </div>
          <div className="grid">
            <TextField
              id="filled-basic"
              label="CEP"
              variant="filled"
              {...register("cep")}
              onBlur={checkCEP}
            />
            <TextField
              id="filled-basic"
              label="Rua"
              focused="true"
              color="grey"
              variant="filled"
              {...register("address")}
            />
            <TextField
              id="filled-basic"
              label="Número"
              variant="filled"
              {...register("addressNumber")}
            />
            <TextField
              id="filled-basic"
              label="Bairro"
              focused="true"
              color="grey"
              variant="filled"
              {...register("neighborhood")}
            />
            <TextField
              id="filled-basic"
              label="Cidade"
              focused="true"
              color="grey"
              variant="filled"
              {...register("city")}
            />
            <TextField
              id="filled-basic"
              label="Estado"
              variant="filled"
              focused="true"
              color="grey"
              {...register("uf")}
            />
          </div>
          <Button variant="contained" type="submit">
            Enviar
          </Button>
        </form>
      </section>
    </>
  );
}

export default App;
