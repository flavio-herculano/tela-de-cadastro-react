import React from "react";
import { useForm } from "react-hook-form";
import "./App.css";
import { Button } from "@mui/material";

function App() {
  const { register, handleSubmit, setValue, setFocus } = useForm();

  const onSubmit = (e) => {
    console.log(e);
  };

  const checkCEP = (e) => {
    const cep = e.target.value.replace(/\D/g, "");
    console.log(cep);
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
            <label>
              Nome
              <input type="text" {...register("name")} />
            </label>
            <label>
              Sobrenome
              <input type="text" {...register("lastname")} />
            </label>
            <label>
              Data de Nascimento
              <input type="date" {...register("birthday")} />
            </label>
            <label>
              CPF
              <input type="text" {...register("cpf")} />
            </label>
            <label>
              RG
              <input type="text" {...register("rg")} />
            </label>
          </div>
          <div className="grid">
            <label>
              CEP
              <input type="text" {...register("cep")} onBlur={checkCEP} />
            </label>
            <label>
              Rua
              <input type="text" {...register("address")} />
            </label>
            <label>
              Número
              <input type="text" {...register("addressNumber")} />
            </label>
            <label>
              Bairro
              <input type="text" {...register("neighborhood")} />
            </label>
            <label>
              Cidade
              <input type="text" {...register("city")} />
            </label>
            <label>
              Estado
              <input type="text" {...register("uf")} />
            </label>
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
