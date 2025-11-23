import React from "react";
import Container from "./Container";
import FooterTop from "./FooterTop";
import Logo from "./Logo";
import { SubText, SubTitle } from "./ui/text";
import { categoriesData } from "@/constants/data";
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
              Descubra coleções de camisas selecionadas na GTeam Store, combinando
              estilo e conforto para elevar seus espaços de vida.
            </SubText>
          </div>

          <div className="space-y-4">
            <SubTitle>Newsletter</SubTitle>
            <SubText>
              Inscreva-se em nossa newsletter para receber atualizações e ofertas
              exclusivas
            </SubText>
            <form className="space-y-3">
              <Input placeholder="Digite seu e-mail" type="email" required />
              <Button className="w-full">Inscrever-se</Button>
            </form>
          </div>
        </div>
        <div className="py-6 border-t text-center text-sm text-gray-600">
          <div>
            © {new Date().getFullYear()} <Logo className="text-sm" />. Todos
            os direitos reservados.
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
