const tickerItems = [
    "ENTREGA DE KIT DE CORRIDA EM BELO HORIZONTE",
    "RETIRAMOS SEU KIT DIRETO COM A ORGANIZAÇÃO DA CORRIDA",
    "ENTREGAMOS EM BH, NOVA LIMA, CONTAGEM E REGIÃO METROPOLITANA",
    "SEM FILA NO EVENTO, SEM DESLOCAMENTO PARA RETIRAR O KIT",
    "ACOMPANHE SEU PEDIDO DA RETIRADA ATÉ A ENTREGA NA SUA CASA",
    "DELIVERY DE KIT ESPORTIVO PARA CORREDORES DE MINAS GERAIS",
    "MAIS TEMPO PARA TREINAR, A MOVE+ CUIDA DA RETIRADA",
    "MOVE+, ENTREGA DE KIT DE CORRIDA COM SEGURANÇA E AGILIDADE",
];

function TickerGroup() {
    return (
        <div className="ticketbar-group" aria-hidden="true">
            {tickerItems.map((item) => (
                <span key={item} className="ticketbar-item">
                    {item}
                </span>
            ))}
        </div>
    );
}

export default function TicketBar() {
    return (
        <div
            className="ticketbar-wrap"
            role="region"
            aria-label="Entrega de kit de corrida em Belo Horizonte e região metropolitana"
        >
            <div className="ticketbar-track">
                <TickerGroup />
                <TickerGroup />
            </div>
        </div>
    );
}
