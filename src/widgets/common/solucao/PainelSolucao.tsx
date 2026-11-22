// Painel da solução: m, V e C com a conta feita com os números atuais (C = m/V), na cor de cada marca.
import { num } from "../plot2d";
import { resolverSolucao, type ResultadoSolucao } from "./calc";

interface Props {
  massa: number;
  volume: number;
  res: ResultadoSolucao;
  soluto: { nome: string; formula?: string; massa_molar?: number; solubilidade?: number };
  mostrar: { mol: boolean; concentracao: boolean };
  referencia?: { massa: number; volume: number; rotulo: string };
}

export function PainelSolucao({ massa, volume, res, soluto, mostrar, referencia }: Props) {
  const litros = volume / 1000;
  const antes = referencia ? resolverSolucao({ massa: referencia.massa, volume: referencia.volume, solubilidade: soluto.solubilidade }) : null;
  return (
    <div className="medidas" aria-live="polite">
      <dl className="medidas__grade">
        <div className="medida medida--c1">
          <dt>Massa de soluto (m)</dt>
          <dd>{num(massa)} g</dd>
        </div>
        <div className="medida medida--c2">
          <dt>Volume (V)</dt>
          <dd>
            {num(volume, 0)} mL = {num(litros, 3)} L
          </dd>
        </div>
        {mostrar.concentracao && (
          <div className="medida medida--c3">
            <dt>Concentração (C)</dt>
            <dd>{num(res.concentracao, 2)} g/L</dd>
            <dd className="medida__formula">
              C = m / V = {num(res.dissolvida)} g ÷ {num(litros, 3)} L
            </dd>
          </div>
        )}
        {mostrar.mol && res.mols !== null && res.concentracaoMol !== null && (
          <div className="medida medida--ink">
            <dt>Em mol/L</dt>
            <dd>{num(res.concentracaoMol, 3)} mol/L</dd>
            <dd className="medida__formula">
              n = m / M = {num(res.mols, 3)} mol (M = {num(soluto.massa_molar!, 1)} g/mol)
            </dd>
          </div>
        )}
      </dl>
      <p className="medidas__nota">
        Soluto: {soluto.nome}
        {soluto.formula ? ` (${soluto.formula})` : ""}.
        {antes && mostrar.concentracao
          ? ` ${referencia!.rotulo[0].toUpperCase()}${referencia!.rotulo.slice(1)}: ${num(antes.concentracao, 1)} g/L em ${num(referencia!.volume, 0)} mL.`
          : ""}
        {res.excesso > 0 ? ` Solução saturada: ${num(res.excesso)} g ficaram sem dissolver no fundo.` : ""}
      </p>
    </div>
  );
}
