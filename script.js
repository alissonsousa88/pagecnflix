// Variáveis globais
let currentVideoId = '';

// Função para reproduzir vídeo
function playVideo(videoId) {
    currentVideoId = videoId;
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Construir URL do YouTube embed
    const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
    
    videoFrame.src = embedUrl;
    modal.style.display = 'block';
    
    // Prevenir scroll do body quando modal está aberto
    document.body.style.overflow = 'hidden';
}

// Função para fechar modal
function closeModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    modal.style.display = 'none';
    videoFrame.src = '';
    
    // Restaurar scroll do body
    document.body.style.overflow = 'auto';
}

// Fechar modal ao clicar fora do conteúdo
window.onclick = function(event) {
    const modal = document.getElementById('videoModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Fechar modal com tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Navegação suave
function smoothScroll(targetId) {
    const target = document.getElementById(targetId);
    if (target) {
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Atualizar navegação ativa
function updateActiveNav() {
    const sections = ['inicio', 'musicas', 'desenhos', 'historias'];
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = 'inicio';
    
    sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                currentSection = sectionId;
            }
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Funcionalidade de busca
function setupSearch() {
    const searchInput = document.querySelector('.search-input');
    const videoCards = document.querySelectorAll('.video-card');
    
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        videoCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.opacity = '1';
            } else {
                card.style.display = searchTerm === '' ? 'block' : 'none';
                card.style.opacity = searchTerm === '' ? '1' : '0.5';
            }
        });
        
        // Se não há termo de busca, mostrar todos os cards
        if (searchTerm === '') {
            videoCards.forEach(card => {
                card.style.display = 'block';
                card.style.opacity = '1';
            });
        }
    });
}

// Efeito parallax no header
function setupHeaderEffect() {
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (scrolled > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.9)';
        }
    });
}

// Animação de entrada dos cards
function animateCards() {
    const cards = document.querySelectorAll('.video-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// Carrossel com scroll suave
function setupCarouselScroll() {
    const carousels = document.querySelectorAll('.video-carousel');
    
    carousels.forEach(carousel => {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        carousel.addEventListener('mousedown', (e) => {
            isDown = true;
            carousel.classList.add('active');
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });
        
        carousel.addEventListener('mouseleave', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mouseup', () => {
            isDown = false;
            carousel.classList.remove('active');
        });
        
        carousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2;
            carousel.scrollLeft = scrollLeft - walk;
        });
    });
}

// Adicionar botões de navegação do carrossel
function addCarouselButtons() {
    const carousels = document.querySelectorAll('.video-carousel');
    
    carousels.forEach(carousel => {
        const container = carousel.parentElement;
        
        // Criar botões
        const prevBtn = document.createElement('button');
        const nextBtn = document.createElement('button');
        
        prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
        nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
        
        prevBtn.className = 'carousel-btn carousel-btn-prev';
        nextBtn.className = 'carousel-btn carousel-btn-next';
        
        // Adicionar estilos
        const btnStyle = `
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background: rgba(0, 0, 0, 0.7);
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            cursor: pointer;
            z-index: 10;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
        `;
        
        prevBtn.style.cssText = btnStyle + 'left: 10px;';
        nextBtn.style.cssText = btnStyle + 'right: 10px;';
        
        // Adicionar hover effects
        [prevBtn, nextBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'rgba(255, 215, 0, 0.8)';
                btn.style.transform = 'translateY(-50%) scale(1.1)';
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'rgba(0, 0, 0, 0.7)';
                btn.style.transform = 'translateY(-50%) scale(1)';
            });
        });
        
        // Funcionalidade dos botões
        prevBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        nextBtn.addEventListener('click', () => {
            carousel.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        // Posicionar container como relative
        container.style.position = 'relative';
        
        // Adicionar botões ao container
        container.appendChild(prevBtn);
        container.appendChild(nextBtn);
    });
}

// Função para adicionar efeitos de hover nos cards
function addCardHoverEffects() {
    const cards = document.querySelectorAll('.video-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
            this.style.boxShadow = '0 20px 40px rgba(255, 215, 0, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.2)';
        });
    });
}

// Configurar navegação por clique
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScroll(targetId);
        });
    });
}

// Função para criar efeito de loading
function showLoading() {
    const loading = document.createElement('div');
    loading.id = 'loading';
    loading.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999;
        ">
            <div style="
                color: #FFD700;
                font-size: 1.5rem;
                text-align: center;
            ">
                <i class="fas fa-spinner fa-spin" style="font-size: 3rem; margin-bottom: 1rem;"></i>
                <br>Carregando vídeo...
            </div>
        </div>
    `;
    document.body.appendChild(loading);
    
    setTimeout(() => {
        if (document.getElementById('loading')) {
            document.body.removeChild(loading);
        }
    }, 2000);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Configurar todas as funcionalidades
    setupSearch();
    setupHeaderEffect();
    setupNavigation();
    animateCards();
    setupCarouselScroll();
    addCarouselButtons();
    addCardHoverEffects();
    
    // Atualizar navegação ativa no scroll
    window.addEventListener('scroll', updateActiveNav);
    
    // Adicionar efeito de loading ao reproduzir vídeos
    const originalPlayVideo = window.playVideo;
    window.playVideo = function(videoId) {
        showLoading();
        setTimeout(() => originalPlayVideo(videoId), 500);
    };
    
    console.log('Kids Cristãos - Website carregado com sucesso!');
});

// Função para adicionar mais vídeos dinamicamente (para futuras expansões)
function addVideo(section, videoData) {
    const sectionElement = document.getElementById(section);
    const carousel = sectionElement.querySelector('.carousel-container');
    
    const videoCard = document.createElement('div');
    videoCard.className = 'video-card';
    videoCard.onclick = () => playVideo(videoData.id);
    
    videoCard.innerHTML = `
        <img src="https://img.youtube.com/vi/${videoData.id}/hqdefault.jpg" alt="${videoData.title}">
        <div class="video-info">
            <h3>${videoData.title}</h3>
            <p>${videoData.description}</p>
        </div>
    `;
    
    carousel.appendChild(videoCard);
}

// Função para modo noturno/diurno (opcional)
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('light-theme');
    
    const themeIcon = document.querySelector('.theme-toggle i');
    if (body.classList.contains('light-theme')) {
        themeIcon.className = 'fas fa-moon';
    } else {
        themeIcon.className = 'fas fa-sun';
    }
}

