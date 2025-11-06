-- migrate up

CREATE TABLE IF NOT EXISTS articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    image TEXT NOT NULL,
    content TEXT NOT NULL
);

INSERT INTO articles (title, category, image, content) VALUES
('Crítica: Uma Sexta-Feira Muito Louca', 'Critica', 'https://br.web.img2.acsta.net/img/6f/66/6f66138617975f82a2117bb7870681ed.jpg', 'Este é o conteúdo completo do artigo sobre a crítica do filme ''Uma Sexta-Feira Muito Louca''. A trama segue a história de uma mãe e filha que trocam de corpos...');

INSERT INTO articles (title, category, image, content) VALUES
('Os 10 melhores filmes de todos os tempos, segundo o Rotten Tomatoes', 'Streaming', 'https://picsum.photos/1000/600?random=101', 'O ranking dos melhores filmes de todos os tempos foi atualizado pelo famoso agregador de críticas, Rotten Tomatoes. A lista conta com clássicos como ''O Poderoso Chefão'', ''Pulp Fiction'' e...');

INSERT INTO articles (title, category, image, content) VALUES
('Round 6 ensinou a Jo Yu-ri que “mães são fortes e não dá para namorar babacas”', 'Entrevista', 'https://picsum.photos/1000/600?random=103', 'Em entrevista, a atriz Jo Yu-ri discute as profundas lições de vida que o drama coreano "Round 6" transmitiu a ela.');

INSERT INTO articles (title, category, image, content) VALUES
('Nosso Lar 3: O fenômeno de bilheteria do cinema nacional retorna com tecnologia de ponta e "uma história de amor no mundo espiritual" (Visita ao Set)', 'Entrevista', 'https://br.web.img3.acsta.net/img/31/db/31dbdafb6bd95befcac44b52f625a932.jpg', 'Em uma entrevista exclusiva, a equipe de "Nosso Lar 3" falou sobre a inovação tecnológica e o foco narrativo que promete emocionar o público.');

INSERT INTO articles (title, category, image, content) VALUES
('Por Inteiro funciona através da química entre Brett Goldstein e Imogen Poots', 'Critica', 'https://cdn.ome.lt/utXEAEz0ijzkgydnuBi3RwD0G8w=/987x0/smart/uploads/conteudo/fotos/porinteiro-criticacapa.png', 'O novo drama romântico do Apple TV+ tem roteiro afiado para questionar a ideia de "alma gêmea".');

INSERT INTO articles (title, category, image, content) VALUES
('DESTAQUE: 5 plataformas de streaming para cinéfilos', 'Home', 'https://picsum.photos/1200/600?random=14', 'Aqui estão 5 plataformas de streaming independentes com catálogos focados em cinema de arte, filmes independentes e conteúdo cultural, que fogem do circuito comercial:...'); 

INSERT INTO articles (title, category, image, content) VALUES
('Os Melhores Filmes de Ação da Década', 'Streaming', 'https://picsum.photos/1000/600?random=105', 'Selecionamos os 10 melhores filmes de ação disponíveis nas principais plataformas de streaming (Netflix, Prime Video e HBO Max), perfeitos para uma maratona.');

INSERT INTO articles (title, category, image, content) VALUES
('Atriz de ''Invocação do Mal 4'' revela assombrações durante as filmagens', 'Entrevista', 'https://rollingstone.com.br/wp-content/uploads/2024/07/invocacao-do-mal-4-que-encerra-franquia-nos-cinemas-ganha-data-de-estreia.jpg', 'Em entrevista, a atriz principal de "Invocação do Mal 4" conta experiências assustadoras durante a gravação.');

INSERT INTO articles (title, category, image, content) VALUES
('Netflix cancela nove séries de ficção popular em 2024', 'Noticias', 'https://br.web.img3.acsta.net/img/45/ad/45ad27e72b3c7f7e954a7f7d6557a08a.jpg', 'A Netflix cancelou várias séries de ficção popular em 2024. A lista completa de cancelamentos é extensa e inclui mais de nove títulos. 

Aqui estão algumas das séries de ficção popular canceladas pela Netflix em 2024:

* The Brothers Sun: Cancelada após uma temporada, apesar do sucesso inicial, devido a custos de produção e a uma audiência que não se manteve consistente.

* Dead Boy Detectives: Esta série, parte do universo Sandman/DC Comics, foi cancelada após sua primeira temporada.

* That 90s Show: A sequência de That 70s Show foi cancelada após duas temporadas.

* Girls5eva: Embora tenha tido três temporadas, a Netflix, que produziu apenas a terceira (após resgatá-la do Peacock), optou por não renovar a série.

* Kaos: Uma comédia de humor mitológica que foi cancelada logo após o lançamento de sua primeira temporada.

* Unstable: A comédia estrelada por Rob Lowe e seu filho foi cancelada após duas temporadas.

* Obliterated: Uma série de ação e comédia que teve apenas uma temporada.

* Ratched: Embora tenha sido lançada em 2020, foi confirmado em 2024 que a série não retornaria para a segunda temporada.

* Everything Now: Uma série britânica focada em jovens adultos que foi cancelada após uma temporada.');

INSERT INTO articles (title, category, image, content) VALUES
('Exclusivo: Nova série de terror do HBO Max promete ser o sucesso de 2025', 'Noticias', 'https://cinepop.com.br/wp-content/uploads/2025/10/it-bem-vindos-a-derry.webp', 'A série It: Bem-Vindos a Derry já estreou! Ela foi lançada em 26 de outubro de 2025 na HBO e HBO Max e rapidamente se tornou um sucesso, com episódios lançados semanalmente. Como você mencionou, ela é um terror psicológico sombrio e conta com um elenco de peso. 

<strong>Sobre a Série</strong>

* Gênero: Terror psicológico, drama.

* Plataforma: HBO e HBO Max.

* Status: Atualmente em exibição, com novos episódios lançados aos domingos.

* Temporadas: A série está planejada para ter três temporadas, com nove episódios na primeira.
 
<strong>Enredo e Ambientação</strong>

A série é um prelúdio dos eventos dos filmes It: A Coisa (2017) e It: Capítulo Dois (2019) e se aprofunda no universo criado por Stephen King. A trama se passa na cidade de Derry, Maine, nos anos 60, décadas antes do Clube dos Perdedores entrar em ação.
 
O foco da narrativa é mostrar as origens sombrias da cidade e como a entidade maligna conhecida como "It" — que assume a forma do palhaço Pennywise — se torna o pesadelo que conhecemos. A história explora a violência, o racismo estrutural e os medos coletivos da época, que servem de pano de fundo para as manifestações do terror. A primeira temporada aborda os eventos que culminam em tragédias conhecidas do livro, como o incêndio no "Black Spot".
 
<strong>Elenco de Peso</strong>

Um dos maiores destaques é o retorno de Bill Skarsgård no papel de Pennywise, o palhaço aterrorizante que marcou os filmes recentes. Além dele, o elenco principal inclui: 

* Jovan Adepo (de Watchmen)
* Chris Messina (de The Mindy Project)
* Taylour Paige (de Zola)
* James Remar (de Dexter)
* Stephen Rider (de Demolidor)

A série expande a maldade dos filmes e promete uma experiência de terror fiel ao material original de Stephen King.');