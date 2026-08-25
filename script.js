// ============================================
// CONFIGURAÇÕES
// ============================================

const NUMERO_WHATSAPP = "5548996080556";

const URL_GOOGLE_SHEETS =
    "https://script.google.com/macros/s/AKfycbzT_oz7tNzfyWeGW6F5dERw4zDx7PjOz7A7q3bSVz2RENu6PLLgi2R4D45ZHHc_qxJ83Q/exec";


// ============================================
// ELEMENTOS
// ============================================

const form = document.getElementById("adoptionForm");

const successMessage =
    document.getElementById("successMessage");

const newFormButton =
    document.getElementById("newFormButton");

const clearButton =
    document.getElementById("clearButton");


// ============================================
// FUNÇÃO PARA PEGAR VALORES
// ============================================

function valor(id) {

    const campo = document.getElementById(id);

    if (!campo) {
        return "";
    }

    return campo.value.trim();
}


// ============================================
// PEGAR RADIO BUTTON
// ============================================

function pegarRadio(nome) {

    const selecionado =
        document.querySelector(
            `input[name="${nome}"]:checked`
        );

    return selecionado
        ? selecionado.value
        : "Não informado";
}


// ============================================
// FORMATAR DATA
// ============================================

function formatarData(data) {

    if (!data) {
        return "Não informado";
    }

    const partes = data.split("-");

    if (partes.length !== 3) {
        return data;
    }

    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}


// ============================================
// CAMPOS CONDICIONAIS
// ============================================

// CIDADE

const cidade = document.getElementById("cidade");

const outraCidadeField =
    document.getElementById("outraCidadeField");


if (cidade) {

    cidade.addEventListener("change", function () {

        if (cidade.value === "Outra") {

            outraCidadeField.classList.remove("hidden");

        } else {

            outraCidadeField.classList.add("hidden");

            const outraCidade =
                document.getElementById("outraCidade");

            if (outraCidade) {
                outraCidade.value = "";
            }
        }
    });
}


// ESPÉCIE

const especie =
    document.getElementById("especie");

const outraEspecieField =
    document.getElementById("outraEspecieField");


if (especie) {

    especie.addEventListener("change", function () {

        if (especie.value === "Outra") {

            outraEspecieField.classList.remove("hidden");

        } else {

            outraEspecieField.classList.add("hidden");

            const outraEspecie =
                document.getElementById("outraEspecie");

            if (outraEspecie) {
                outraEspecie.value = "";
            }
        }
    });
}


// RAÇA

const raca =
    document.getElementById("raca");

const outraRacaField =
    document.getElementById("outraRacaField");


if (raca) {

    raca.addEventListener("change", function () {

        if (raca.value === "Outra") {

            outraRacaField.classList.remove("hidden");

        } else {

            outraRacaField.classList.add("hidden");

            const outraRaca =
                document.getElementById("outraRaca");

            if (outraRaca) {
                outraRaca.value = "";
            }
        }
    });
}


// ============================================
// MÁSCARA CPF
// ============================================

const cpf =
    document.getElementById("cpf");


if (cpf) {

    cpf.addEventListener("input", function () {

        let valorCPF =
            cpf.value.replace(/\D/g, "");

        valorCPF =
            valorCPF.substring(0, 11);

        valorCPF =
            valorCPF.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );

        valorCPF =
            valorCPF.replace(
                /(\d{3})(\d)/,
                "$1.$2"
            );

        valorCPF =
            valorCPF.replace(
                /(\d{3})(\d{1,2})$/,
                "$1-$2"
            );

        cpf.value = valorCPF;

    });
}


// ============================================
// MÁSCARA TELEFONE
// ============================================

function aplicarMascaraTelefone(campo) {

    if (!campo) {
        return;
    }

    campo.addEventListener("input", function () {

        let telefone =
            campo.value.replace(/\D/g, "");

        telefone =
            telefone.substring(0, 11);

        if (telefone.length <= 10) {

            telefone =
                telefone.replace(
                    /^(\d{2})(\d{4})(\d)/,
                    "($1) $2-$3"
                );

        } else {

            telefone =
                telefone.replace(
                    /^(\d{2})(\d{5})(\d{1,4})/,
                    "($1) $2-$3"
                );
        }

        campo.value = telefone;

    });
}


aplicarMascaraTelefone(
    document.getElementById("telefone")
);

aplicarMascaraTelefone(
    document.getElementById("telefoneSecundario")
);


// ============================================
// MÁSCARA CEP
// ============================================

const cep =
    document.getElementById("cep");


if (cep) {

    cep.addEventListener("input", function () {

        let valorCEP =
            cep.value.replace(/\D/g, "");

        valorCEP =
            valorCEP.substring(0, 8);

        if (valorCEP.length > 5) {

            valorCEP =
                valorCEP.replace(
                    /^(\d{5})(\d)/,
                    "$1-$2"
                );
        }

        cep.value = valorCEP;

    });
}


// ============================================
// DATA ATUAL
// ============================================

const dataAdocao =
    document.getElementById("dataAdocao");


const hoje = new Date();

const ano =
    hoje.getFullYear();

const mes =
    String(
        hoje.getMonth() + 1
    ).padStart(2, "0");

const dia =
    String(
        hoje.getDate()
    ).padStart(2, "0");


if (dataAdocao) {

    dataAdocao.value =
        `${ano}-${mes}-${dia}`;
}


// ============================================
// SALVAR RASCUNHO
// ============================================

function salvarRascunho() {

    if (!form) {
        return;
    }

    const dados = {};

    const campos =
        form.querySelectorAll(
            "input, select, textarea"
        );


    campos.forEach(function (campo) {

        if (
            campo.type === "radio" ||
            campo.type === "checkbox"
        ) {

            if (
                !Array.isArray(
                    dados[campo.name]
                )
            ) {

                dados[campo.name] = [];
            }


            if (campo.checked) {

                dados[campo.name].push(
                    campo.value
                );
            }

        } else {

            dados[campo.name] =
                campo.value;
        }

    });


    localStorage.setItem(
        "amigoBichoAdocao",
        JSON.stringify(dados)
    );
}


// Salvar automaticamente

if (form) {

    form.addEventListener(
        "input",
        salvarRascunho
    );

    form.addEventListener(
        "change",
        salvarRascunho
    );
}


// ============================================
// RECUPERAR RASCUNHO
// ============================================

function recuperarRascunho() {

    if (!form) {
        return;
    }

    const salvo =
        localStorage.getItem(
            "amigoBichoAdocao"
        );


    if (!salvo) {
        return;
    }


    try {

        const dados =
            JSON.parse(salvo);


        Object.keys(dados).forEach(
            function (nome) {

                const campos =
                    form.querySelectorAll(
                        `[name="${nome}"]`
                    );


                campos.forEach(
                    function (campo) {

                        const valorSalvo =
                            dados[nome];


                        if (
                            campo.type === "radio" ||
                            campo.type === "checkbox"
                        ) {

                            if (
                                Array.isArray(
                                    valorSalvo
                                )
                            ) {

                                campo.checked =
                                    valorSalvo.includes(
                                        campo.value
                                    );
                            }

                        } else {

                            campo.value =
                                valorSalvo;
                        }

                    }
                );
            }
        );


        if (cidade) {
            cidade.dispatchEvent(
                new Event("change")
            );
        }


        if (especie) {
            especie.dispatchEvent(
                new Event("change")
            );
        }


        if (raca) {
            raca.dispatchEvent(
                new Event("change")
            );
        }


    } catch (erro) {

        console.log(
            "Não foi possível recuperar o rascunho.",
            erro
        );
    }
}


recuperarRascunho();


// ============================================
// GERAR MENSAGEM DO WHATSAPP
// ============================================

function gerarMensagem() {

    const cidadeFinal =
        cidade && cidade.value === "Outra"
            ? valor("outraCidade")
            : valor("cidade");


    const especieFinal =
        especie && especie.value === "Outra"
            ? valor("outraEspecie")
            : valor("especie");


    const racaFinal =
        raca && raca.value === "Outra"
            ? valor("outraRaca")
            : valor("raca");


    const mensagem = `
🐾 *NOVO TERMO DE ADOÇÃO RESPONSÁVEL*

*INSTITUIÇÃO AMIGO BICHO*

━━━━━━━━━━━━━━━━━━━━

👤 *DADOS DO ADOTANTE*

*Nome:* ${valor("nome")}

*CPF:* ${valor("cpf")}

*RG:* ${valor("rg") || "Não informado"}

*Data de nascimento:* ${formatarData(
        valor("nascimento")
    )}

*WhatsApp:* ${valor("telefone")}

*Telefone secundário:* ${
        valor("telefoneSecundario") ||
        "Não informado"
    }

*E-mail:* ${
        valor("email") ||
        "Não informado"
    }

*Endereço:* ${valor("endereco")}

*Bairro:* ${valor("bairro")}

*Cidade:* ${cidadeFinal}

*CEP:* ${
        valor("cep") ||
        "Não informado"
    }

━━━━━━━━━━━━━━━━━━━━

🐶 *SOBRE O ANIMAL*

*Nome:* ${
        valor("nomeAnimal") ||
        "Não informado"
    }

*Espécie:* ${
        especieFinal ||
        "Não informado"
    }

*Idade aproximada:* ${
        valor("idadeAnimal") ||
        "Não informado"
    }

*Porte:* ${
        valor("porte") ||
        "Não informado"
    }

*Raça:* ${
        racaFinal ||
        "Não informado"
    }

*Cor da pelagem:* ${
        valor("corPelagem") ||
        "Não informado"
    }

*Castrado:* ${pegarRadio("castrado")}

*Vermifugado:* ${pegarRadio("vermifugado")}

*Vacinado:* ${pegarRadio("vacinado")}

*Observações:* ${
        valor("observacoes") ||
        "Nenhuma"
    }

━━━━━━━━━━━━━━━━━━━━

🏠 *LOCAL ONDE O ANIMAL VIVERÁ*

*O animal ficará:* ${pegarRadio("localAnimal")}

*Tipo de moradia:* ${
        valor("tipoMoradia") ||
        "Não informado"
    }

*Possui espaço seguro:* ${
        pegarRadio("espacoSeguro")
    }

*Possui outros animais:* ${
        pegarRadio("outrosAnimais")
    }

*Quais animais:* ${
        valor("quaisAnimais") ||
        "Não informado"
    }

*Imóvel cercado/murado:* ${
        pegarRadio("imovelCercado")
    }

*Onde o animal ficará:* ${
        pegarRadio("ondeFicara")
    }

━━━━━━━━━━━━━━━━━━━━

📋 *TERMO DE RESPONSABILIDADE*

☑️ Apto(a) a assumir a guarda responsável.

☑️ Compromisso com alimentação, água, abrigo, cuidados veterinários e bem-estar.

☑️ Compromisso de não abandonar, vender ou doar sem comunicar a Instituição Amigo Bicho.

☑️ Ciente da possibilidade de acompanhamento pela instituição.

☑️ Declara ter lido e concordado com todas as informações do termo.

*Assinatura eletrônica:*
${valor("assinatura")}

*Data da adoção:*
${formatarData(
        valor("dataAdocao")
    )}

━━━━━━━━━━━━━━━━━━━━

🐾 *Instituição Amigo Bicho*

Adoção responsável transforma vidas. ❤️
`;

    return mensagem.trim();
}


// ============================================
// ENVIAR FORMULÁRIO
// ============================================

if (form) {

    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            // Validação

            if (!form.checkValidity()) {

                form.reportValidity();

                return;
            }


            // Verificar assinatura

            const nome =
                valor("nome")
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .trim();


            const assinatura =
                valor("assinatura")
                    .toLowerCase()
                    .replace(/\s+/g, " ")
                    .trim();


            if (nome !== assinatura) {

                alert(
                    "A assinatura eletrônica deve ser igual ao nome completo informado."
                );

                document
                    .getElementById("assinatura")
                    .focus();

                return;
            }


            // Botão

            const botao =
                form.querySelector(
                    ".submit-button"
                );


            const textoOriginal =
                botao.innerHTML;


            botao.disabled = true;

            botao.innerHTML =
                "⏳ Registrando formulário...";


            // Dados

            const dados = {

                nome: valor("nome"),

                cpf: valor("cpf"),

                rg: valor("rg"),

                nascimento:
                    valor("nascimento"),

                telefone:
                    valor("telefone"),

                telefoneSecundario:
                    valor("telefoneSecundario"),

                email:
                    valor("email"),

                endereco:
                    valor("endereco"),

                bairro:
                    valor("bairro"),

                cidade:
                    cidade && cidade.value === "Outra"
                        ? valor("outraCidade")
                        : valor("cidade"),

                cep:
                    valor("cep"),


                nomeAnimal:
                    valor("nomeAnimal"),

                especie:
                    especie && especie.value === "Outra"
                        ? valor("outraEspecie")
                        : valor("especie"),

                idadeAnimal:
                    valor("idadeAnimal"),

                porte:
                    valor("porte"),

                raca:
                    raca && raca.value === "Outra"
                        ? valor("outraRaca")
                        : valor("raca"),

                corPelagem:
                    valor("corPelagem"),


                castrado:
                    pegarRadio("castrado"),

                vermifugado:
                    pegarRadio("vermifugado"),

                vacinado:
                    pegarRadio("vacinado"),

                observacoes:
                    valor("observacoes"),


                localAnimal:
                    pegarRadio("localAnimal"),

                tipoMoradia:
                    valor("tipoMoradia"),

                espacoSeguro:
                    pegarRadio("espacoSeguro"),

                outrosAnimais:
                    pegarRadio("outrosAnimais"),

                quaisAnimais:
                    valor("quaisAnimais"),

                imovelCercado:
                    pegarRadio("imovelCercado"),

                ondeFicara:
                    pegarRadio("ondeFicara"),


                assinatura:
                    valor("assinatura"),

                dataAdocao:
                    valor("dataAdocao")
            };


            try {

                // ====================================
                // ENVIAR PARA GOOGLE SHEETS
                // ====================================

                await fetch(
                    URL_GOOGLE_SHEETS,
                    {
                        method: "POST",

                        mode: "no-cors",

                        headers: {
                            "Content-Type":
                                "text/plain;charset=utf-8"
                        },

                        body:
                            JSON.stringify(dados)
                    }
                );


                // ====================================
                // GERAR WHATSAPP
                // ====================================

                const mensagem =
                    gerarMensagem();


                const mensagemCodificada =
                    encodeURIComponent(
                        mensagem
                    );


                const whatsappURL =
                    `https://wa.me/${NUMERO_WHATSAPP}?text=${mensagemCodificada}`;


                // ====================================
                // LIMPAR RASCUNHO
                // ====================================

                localStorage.removeItem(
                    "amigoBichoAdocao"
                );


                // ====================================
                // MOSTRAR SUCESSO
                // ====================================

                form.classList.add(
                    "hidden"
                );


                successMessage.classList.remove(
                    "hidden"
                );


                // ====================================
                // ABRIR WHATSAPP
                // ====================================

                setTimeout(
                    function () {

                        window.open(
                            whatsappURL,
                            "_blank"
                        );

                    },
                    700
                );


            } catch (erro) {

                console.error(
                    "Erro ao enviar formulário:",
                    erro
                );


                alert(
                    "Não foi possível registrar o formulário. Verifique sua conexão e tente novamente."
                );


                botao.disabled = false;

                botao.innerHTML =
                    textoOriginal;
            }

        }
    );
}


// ============================================
// LIMPAR FORMULÁRIO
// ============================================

if (clearButton) {

    clearButton.addEventListener(
        "click",
        function () {

            const confirmar =
                confirm(
                    "Tem certeza que deseja limpar todas as informações preenchidas?"
                );


            if (!confirmar) {
                return;
            }


            form.reset();


            localStorage.removeItem(
                "amigoBichoAdocao"
            );


            if (outraCidadeField) {

                outraCidadeField.classList.add(
                    "hidden"
                );
            }


            if (outraEspecieField) {

                outraEspecieField.classList.add(
                    "hidden"
                );
            }


            if (outraRacaField) {

                outraRacaField.classList.add(
                    "hidden"
                );
            }


            if (dataAdocao) {

                dataAdocao.value =
                    `${ano}-${mes}-${dia}`;
            }


            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );
}


// ============================================
// NOVO FORMULÁRIO
// ============================================

if (newFormButton) {

    newFormButton.addEventListener(
        "click",
        function () {

            localStorage.removeItem(
                "amigoBichoAdocao"
            );


            window.location.reload();

        }
    );
}