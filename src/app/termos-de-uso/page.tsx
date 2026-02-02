export default function TermosUso() {
    return (
        <div className="w-full bg-gray-50 mx-auto px-12 py-26 text-gray-800">
            <h1 className="text-3xl font-black mb-6">
                Termos de Uso – Move+
            </h1>

            <p className="text-sm text-gray-500 mb-10">
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>

            <section className="space-y-6 text-sm leading-relaxed">
                <p>
                    Bem-vindo à <strong>Move+</strong>. Ao acessar ou utilizar nossa
                    plataforma, você concorda com os presentes Termos de Uso. Caso não
                    concorde com qualquer condição aqui descrita, recomendamos que não
                    utilize nossos serviços.
                </p>

                <h2 className="text-lg font-bold mt-8">
                    1. Sobre a plataforma
                </h2>
                <p>
                    A Move+ é uma plataforma que realiza a venda e a logística de entrega
                    de kits esportivos de corridas parceiras. A compra dos kits é realizada
                    por meio de plataformas de pagamento terceiras, como o
                    <strong> Mercado Pago</strong>, podendo ocorrer via cartão de crédito,
                    débito ou PIX.
                </p>

                <h2 className="text-lg font-bold mt-8">
                    2. Pagamentos
                </h2>
                <p>
                    Todos os pagamentos são processados exclusivamente pelo Mercado Pago.
                    A Move+ não armazena dados bancários ou informações de cartão dos
                    usuários.
                </p>
                <p>
                    O valor cobrado já inclui:
                </p>
                <ul className="list-disc pl-6">
                    <li>Taxa da plataforma</li>
                    <li>Custos de logística e entrega do kit</li>
                </ul>

                <h2 className="text-lg font-bold mt-8">
                    3. Entrega dos kits
                </h2>
                <p>
                    A entrega dos kits é realizada por parceiros logísticos, como serviços
                    de transporte (ex: Uber) ou pela própria equipe da Move+, conforme a
                    região e disponibilidade.
                </p>
                <p>
                    O acompanhamento do status do pedido (separação, saída para entrega e
                    entrega concluída) é feito principalmente via <strong>WhatsApp</strong>.
                </p>

                <h2 className="text-lg font-bold mt-8">
                    4. Cadastro e conta do usuário
                </h2>
                <p>
                    Para realizar compras, o usuário deverá criar uma conta informando
                    dados verdadeiros e atualizados. Essas informações são utilizadas para:
                </p>
                <ul className="list-disc pl-6">
                    <li>Identificação do pedido</li>
                    <li>Processamento da entrega</li>
                    <li>Comunicação sobre o status do kit</li>
                </ul>

                <p>
                    O usuário é responsável por manter a confidencialidade de seus dados
                    de acesso.
                </p>

                <h2 className="text-lg font-bold mt-8">
                    5. Cancelamentos e reembolsos
                </h2>
                <p>
                    Políticas de cancelamento e reembolso seguem as regras do evento
                    parceiro e da plataforma de pagamento utilizada. Caso haja dúvidas,
                    o usuário deve entrar em contato com o suporte da Move+.
                </p>

                <h2 className="text-lg font-bold mt-8">
                    6. Responsabilidades
                </h2>
                <p>
                    A Move+ não se responsabiliza por:
                </p>
                <ul className="list-disc pl-6">
                    <li>Informações incorretas fornecidas pelo usuário</li>
                    <li>Problemas causados por terceiros (organizadores ou plataformas de pagamento)</li>
                    <li>Imprevistos externos que possam atrasar a entrega</li>
                </ul>

                <h2 className="text-lg font-bold mt-8">
                    7. Alterações nos termos
                </h2>
                <p>
                    A Move+ se reserva o direito de alterar estes Termos de Uso a qualquer
                    momento. Recomenda-se que o usuário revise este documento
                    periodicamente.
                </p>

                <h2 className="text-lg font-bold mt-8">
                    8. Contato
                </h2>
                <p>
                    Em caso de dúvidas, solicitações ou suporte, entre em contato conosco
                    pelos canais oficiais da Move+.
                </p>
            </section>
        </div>
    );
}
