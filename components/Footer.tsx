import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import { SubText, SubTitle } from "./ui/text";
import Link from "next/link";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <Container>
        <FooterTop />
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Logo />
            <SubText>
             Descubra a GTeam Store, sua loja online de confiança para produtos
             de alta qualidade. Oferecemos uma ampla variedade de camisas para
             atender todas as suas necessidades. Compre com segurança e
             conveniência na GTeam Store!
            </SubText>
          </div>
          <div className="space-y-4 ">
            <SubTitle>Novidades</SubTitle>
            <SubText>
              Se inscreva para receber as últimas atualizações e ofertas
              especiais.
            </SubText>
            <form className="space-y-3">
              <Input placeholder="Seu Email" type="email" required />
              <Button className="w-full">Inscrever-se</Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} <Logo className="text-sm" /> Todos os Direitos.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;