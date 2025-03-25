// Digitação (JS Completo)
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click',() => {
    menuIcon.classList.toggle('bx-x');
    menuIcon.classList.toggle('open');

    // Bloquear o scroll quando o menu estiver aberto
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';
})

// Fechar menu ao Clicar nos links
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () =>{
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

// Fechar ao rolar a página
window.addEventListener('scroll', () => {
    if(navList.classList.contains('open')){
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
})

// ===== Navegação ativa =====
// Seleciona todos os links de navegação
const navLinks = document.querySelectorAll('.navlist a');

// Função para adicionar a classe 'active' no link clicado
function activeLink(){
    navLinks.forEach(item => item.classList.remove('active'));
    this.classList.add('active');
}

// Adiciona um evento de clique no link de navegação
navLinks.forEach(item => item.addEventListener('click', activeLink));

// ======== Alternar modo laro / modo escuro 
// Função ara alterar entre os temas
function toggleMode(){
    const html = document.documentElement;
    html.classList.toggle('light');

    // Salva o tema escolhido no localStorage
    const mode = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

    // Alterar aparência ao titulo
    updateTextColor();   
}

// Função que altera a cor do texto de acordo com tema
function updateTextColor(){
    currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';
    titleElement.style.color = currentColor;
}

// Carrega o tema salvo no LocalStorage ao carregar a página
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.classList.toggle('light', savedTheme === 'light');
}

// ===== Animação do titulo principal
// Seleciona o elemento 'título' e define as variáveis para animação
const titleElement = document.querySelector('#name');
const text = "Gustavo";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('dark') ? '#fff' : 'black';

// Função para animar o texto (digitando e apagando)
function animateText(){
    if(isTyping){
        if(index < text.length){
            titleElement.textContent = text.slice(0, index + 1);
            index ++;
        } else {
            isTyping = false;
        }
    } else {
        if (index > 1){
            titleElement.textContent = text.slice(0, index -1);
            index --;
        } else {
            isTyping = true;
            // alterna a cor entre preto e laranja
            currentColor = currentColor === (document.documentElement.classList.contains('dark') ? '#fff' : 'black') ? "#c94c16" : (document.documentElement.classList.contains('dark') ? '#fff' : 'black');
            titleElement.style.color = currentColor;
        }
    }
    setTimeout(animateText, 150);
}

// inicia a animação quando carregar a página
document.addEventListener('DOMContentLoaded', animateText);
updateTextColor();

//  ================= ANIMAÇÂO DA SEÇÂO HOME =============
// Seleciona a seção home e aplica uma animação de fade-in
const homeSection = document.querySelector('#home');
homeSection.style.opacity = '0';
homeSection.style.transform = 'translateY(20px)';
homeSection.style.transition = 'opacity 1s ease, transform 1s ease';

setTimeout(()=> {
    homeSection.style.opacity = '1'
    homeSection.style.transform = 'translateY(0)';
}, 100);

//  ================= ANIMAÇÂO DAS SEÇÕES =============
// Seleciona todas as seções e aplica animações de entrada
const sections = document.querySelectorAll('section');

sections.forEach((section, index) => { 
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s, transform 1s';

    // Aplica diferentes transformações com base no índice da seção
    if (index !== 0){
        if (index === 1) section.style.transform = 'translateY(100px)';
        if (index === 2) section.style.transform = 'scale(0.8)';
        if (index === 3) section.style.transform = 'rotateY(90deg)';
    }
});

// Observer para animar as seções ao rolar a página
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
        }
    });
});

// Observa cada seção para aplicar a animação
sections.forEach((section) => observer.observe(section));

// =============== BOTÂO DE VOLTAR AO TOPO =====================
// Adiciona um evento de clique ao botão de voltar ao topo
document.querySelector('.top a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth'}); // Rola suavemmente o topo da página
});

// ====== CARROSSEL DE PROJETOS =====
//seleciona os elementos do carrosel
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');
let currentSlide = 0;
let autoSlideInterval;

// Função para exibir o slide atual
function showSlide(slideIndex){
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });

    // Ajusta o índice do slide para garantir que ele esteja dentro dos limites
    if(slideIndex <0) currentSlide = slides.length - 1;
    else if (slideIndex >= slides.length) currentSlide = 0;
    else currentSlide = slideIndex;

    // exibe o slide atual
    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'flex';
    updateSlidePosition();
}

// Função para atualizar a posição do carrosel
function updateSlidePosition(){
    const slideWidth = slides[0].offsetWidth;
    carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Função para avançar para o próximo slide
function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide(); // Reinicia o intervalo de transição automática
}

// Função para voltar ao slide anterior
function prevSlide(){
    showSlide(currentSlide - 1);
    resetAutoSlide(); // Reinicia o intervalo de transição automática
}

// Função para iniciar a transição automática dos slides
function startAutoSlide(){
    autoSlideInterval = setInterval(nextSlide, 5000); //Avança o slide a cada 5 segundos
}

// Função para reiniciar a transição automática
function resetAutoSlide(){
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Adiciona evento de clique aos botões de navegação do carrosel
nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

// Inicaliza o carrosel ao carregar a página
window.addEventListener('load', () => {
    showSlide(currentSlide);
    startAutoSlide();

    // Atualiza a posição do carrosel ao redimensionar a janela
    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
});

// Pausa a transição automática ao passar o mouse sobre o carrosel
carouselSlides.parentElement.addEventListener('mouseenter', () =>{
    clearInterval(autoSlideInterval);
});

// Retoma a transição automática ao remover o mouse do carrossel
carouselSlides.parentElement.addEventListener('mouseleave', startAutoSlide);

// ========== FORMULÀRIO DE CONTATO ================
// seleciona o formulário de contato e a mensagem de agradecimento
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

// Adiciona um evento de envio de formulário
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    thankYouMessage.style.display = 'block' // Exibe a mensagem de agradecimento

    // Envia os dados do formulário usando Fetch API
    const formData = new FormData(contactForm);
    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json'}
    })
    .then(response => {
        if (response.ok) {
            setTimeout(() => window.location.reload(), 2000); // Recarrega a página após 2 segundos
        } else {
            alert('Erro ao enviar formulário. Tente novamente.');
        }
    })
    .catch(() => alert('Erro na conexão. Tente novamente.'));
});

// ================ ANIMAÇÂO DA SEÇÂO "SOBRE MIM" ===========
// Seleciona a seção "Sobre Mim"
const abouSection = document.querySelector('.about');

// Função para verificar se a seção está visível na tela
function checkAboutVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    // Verifica se a seção está dentro da área visível da tela
    if (rect.top <= windowHeight * 0.75 && rect.botom >= 0) {
        abouSection.classList.add('visible');// Adiciona a classe "vissible"
        window.removeEventListener('scroll', checkAboutVisibility); // Remove o listener após a animação
    }
}

// Adiciona um listener para o evento de scroll
window.addEventListener('scroll', checkAboutVisibility);

// Verifica a visibilidade ao carregar a página (caso a seção já esteja visível)
checkAboutVisibility();