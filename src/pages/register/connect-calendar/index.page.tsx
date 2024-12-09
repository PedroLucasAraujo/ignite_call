import { Button, Heading, MultiStep, Text } from "@ignite-ui/react";
import { ArrowRight } from "phosphor-react";
import { Container, Header } from "../styles";
import { ConnectBox, ConnectItem } from "./styles";

export default function ConnectCalendar() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendário para verificar automáticamente as horas
          ocupadas e os novos eventos à medida em que são agendados
        </Text>

        <MultiStep size={4} currentStep={2} />

        <ConnectBox>
          <ConnectItem>
            <Text>Google Calendar</Text>
            <Button variant="secondary" size="sm">
              Conectar
              <ArrowRight />
            </Button>
          </ConnectItem>
          <Button type="submit">
            Próximo passo
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Header>
    </Container>
  );
}
