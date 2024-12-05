import { stringify } from "querystring";

function input(): string { let X: any = input; X.L = X.L || require("fs").readFileSync(0).toString().split(/\r?\n/); return X.L.shift(); } // _TEST_ONLY_
//function input(): string { let X: any = input; X.P = X.P || require("readline-sync"); return X.P.question() } // _FREE_ONLY_
function write(text: any, endl="\n") { process.stdout.write("" + text + endl); }
export {};

class Pessoa {
    private nome : string;
    private dinheiro: number;

    constructor (nome: string, dinheiro: number) {
        this.nome = nome;
        this.dinheiro = dinheiro;
    }

    toString(): string {
        return `${this.nome}:${this.dinheiro}`
    }

    getNome(): string {
        return this.nome;
    }
    getdinheiro(): number{
        return this.dinheiro;
    }

    setdinheiro(dinheiro: number) {
        this.dinheiro = dinheiro;
    }

}

class Moto {
    private custo: number;
    private motorista: Pessoa | null;
    private passageiro: Pessoa | null;

    constructor() {
        this.custo = 0;
        this.motorista = null;
        this.passageiro = null;
    }

    toString(): string {
        return `Cost: ${this.custo}, Driver: ${this.motorista}, Passenger${this.passageiro}`;
    }

    getcusto(): number {
        return this.custo;
    }
    getmotorista(): Pessoa | null {
        return this.motorista;
    }
    getpassageiro(): Pessoa | null {
        return this.passageiro;
    }

    setDriver(motorista: Pessoa) {
        this.motorista = motorista;
    }
}


class Adapter {
    moto: Moto;
    constructor() {
        this.moto = new Moto();
    }
    setDriver(name: string, money: number): void {
        let motorista = new Pessoa(name, money);
        this.moto.setDriver(motorista);
    }

    setPassenger(name: string, money: number): void {
    }

    drive(distance: number): void {
    }

    leavePassenger(): void {
    }

    show(): void {
    }
}

function main(): void {
    let adapter: Adapter = new Adapter();
    while (true) {
        write("$", "");
        const line = input();
        const args = line.split(" ");
        write(line);

        if      (args[0] === "end"      ) { break;                                   }
        else if (args[0] === "setDriver") { adapter.setDriver(args[1], +args[2]);    }
        else if (args[0] === "setPass"  ) { adapter.setPassenger(args[1], +args[2]); }
        else if (args[0] === "drive"    ) { adapter.drive(+args[1]);                 }
        else if (args[0] === "leavePass") { adapter.leavePassenger();                }
        else if (args[0] === "show"     ) { adapter.show();                          }
        else                              { console.log("fail: command not found");  }
    }
}

main();
