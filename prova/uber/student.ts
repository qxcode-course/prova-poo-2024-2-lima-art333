import { timingSafeEqual } from "crypto";
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
        let motorista = ""

        if (this.motorista == null) {
            motorista = "None"
        } else {
            motorista = this.motorista.toString()
        }

        return `Cost: ${this.custo}, Driver: ${motorista}, Passenger: ${this.passageiro}`;
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

    setPassenger(pessoa: Pessoa ) {
        this.passageiro = pessoa;
    }
    setDrive(distancia: number): void {
        this.custo += distancia;
    }
    leavePassenger(): void {
        if (this.passageiro != null && this.passageiro.getdinheiro() > this.custo) {
            this.passageiro?.setdinheiro(this.passageiro?.getdinheiro() - this.custo)
        } else {
            console.log("fail: Passenger does not have enough money")
            this.passageiro?.setdinheiro(0);
        }

        console.log(`${this.passageiro?.toString()} leave`);
        this.passageiro = null;
        this.motorista?.setdinheiro(this.motorista.getdinheiro() + this.custo)
        this.custo = 0;
        
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
        let passageiro = new Pessoa(name, money);
        this.moto.setPassenger(passageiro);
    }

    drive(distance: number): void {
        this.moto.setDrive(distance)
    }

    leavePassenger(): void {
        this.moto.leavePassenger()
    }

    show(): void {
        console.log(this.moto.toString())
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
