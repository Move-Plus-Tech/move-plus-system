export default function Politicas() {
    return (
        <div className="bg-gray-50 max-w-4xl mx-auto px-6 py-26 text-gray-800">
            <h1 className="text-3xl font-bold mb-6">
                Política de Privacidade — Move+
            </h1>

            <p className="text-sm text-gray-500 mb-10">
                Última atualização: {new Date().toLocaleDateString("pt-BR")}
            </p>

            <section className="space-y-6 text-sm leading-relaxed">
                <p>
                    A <strong>Move+ (Move Plus)</strong> valoriza a sua privacidade e está
                    comprometida em proteger os dados pessoais dos usuários que utilizam
                    nossa plataforma. Esta Política de Privacidade explica como coletamos,
                    utilizamos, armazenamos e protegemos suas informações.
                </p>

                <h2 className="text-lg font-semibold">1. Dados coletados</h2>
                <p>Durante o uso da plataforma, podemos coletar os seguintes dados:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Nome completo</li>
                    <li>CPF</li>
                    <li>E-mail</li>
                    <li>Telefone</li>
                    <li>Informações relacionadas a pedidos e kits adquiridos</li>
                </ul>

                <p>
                    Dados de pagamento <strong>não são armazenados</strong> pela Move+. Todas
                    as transações financeiras são processadas de forma segura pelo
                    <strong> Mercado Pago</strong>.
                </p>

                <h2 className="text-lg font-semibold">2. Uso das informações</h2>
                <p>Os dados coletados são utilizados para:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Identificação e autenticação do usuário</li>
                    <li>Registro e gerenciamento de pedidos</li>
                    <li>Organização da logística e entrega dos kits</li>
                    <li>Comunicação sobre status do pedido (WhatsApp ou e-mail)</li>
                    <li>Suporte ao cliente</li>
                </ul>

                <h2 className="text-lg font-semibold">3. Comunicação</h2>
                <p>
                    A Move+ poderá entrar em contato com o usuário por WhatsApp, e-mail ou
                    outros meios informados, exclusivamente para assuntos relacionados a:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Status da compra</li>
                    <li>Entrega do kit</li>
                    <li>Informações importantes sobre o pedido</li>
                </ul>

                <h2 className="text-lg font-semibold">4. Compartilhamento de dados</h2>
                <p>
                    A Move+ <strong>não vende, aluga ou compartilha</strong> dados pessoais
                    com terceiros, exceto quando necessário para:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Processamento de pagamentos (Mercado Pago)</li>
                    <li>Cumprimento de obrigações legais</li>
                </ul>

                <h2 className="text-lg font-semibold">5. Armazenamento e segurança</h2>
                <p>
                    Utilizamos medidas técnicas e organizacionais adequadas para proteger
                    os dados pessoais contra acessos não autorizados, perda, alteração ou
                    divulgação indevida.
                </p>

                <h2 className="text-lg font-semibold">6. Direitos do usuário</h2>
                <p>O usuário pode, a qualquer momento:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Solicitar acesso aos seus dados</li>
                    <li>Solicitar correção ou atualização</li>
                    <li>Solicitar exclusão dos dados, quando permitido por lei</li>
                </ul>

                <p>
                    Para exercer seus direitos, entre em contato pelos canais oficiais da
                    Move+.
                </p>

                <h2 className="text-lg font-semibold">7. Cookies</h2>
                <p>
                    A plataforma pode utilizar cookies estritamente necessários para o
                    funcionamento correto do sistema, login e segurança do usuário.
                </p>

                <h2 className="text-lg font-semibold">
                    8. Alterações nesta Política
                </h2>
                <p>
                    Esta Política de Privacidade pode ser atualizada a qualquer momento.
                    Recomendamos que o usuário revise este documento periodicamente.
                </p>

                <h2 className="text-lg font-semibold">9. Contato</h2>
                <p>
                    Em caso de dúvidas sobre esta Política de Privacidade, entre em contato
                    com a Move+ através dos nossos canais oficiais.
                </p>
            </section>
        </div>
    );
}
