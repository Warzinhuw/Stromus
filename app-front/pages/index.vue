<template>
  <div>
    <script src="https://kit.fontawesome.com/6c1b2d82eb.js" crossorigin="anonymous"></script>
    
    <!-- Navegação -->
    <b-navbar id="painel_infos">
      <h1 id="stromus_title">Stromus</h1>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

      <div id="buttons_nav">
        <b-navbar-nav>
          <b-nav-item
            @click="
              inicioView = true
              artistaView = false
              cardView = false
              tableView = false
            ">
            <h2><i class="icons_nav fas fa-chess-queen"></i>Inicio</h2>
          </b-nav-item>
          
          <b-nav-item
            @click="
              inicioView = false
              artistaView = true
              tableView = false
              cardView = false
            ">
            <h2><i class="icons_nav fas fa-user-astronaut"></i>Artistas</h2>
          </b-nav-item>

          <b-nav-item
            @click="
              inicioView = false
              artistaView = false
              cardView = true
              tableView = false
            ">
            <h2><i class="icons_nav fas fa-book"></i>Álbuns</h2>
          </b-nav-item>

          <b-nav-item
            @click="
              inicioView = false
              artistaView = false
              tableView = true
              cardView = false
            ">
            <h2><i class="icons_nav fas fa-music"></i>Playlists</h2>
          </b-nav-item>

          <b-nav-item
            @click="
              inicioView = false
              artistaView = false
              cardView = true
              tableView = false
            ">
            <h2><i class="icons_nav fas fa-heart"></i>Curtidas</h2>
          </b-nav-item>
        </b-navbar-nav>
    </div>
  </b-navbar>

  <div id="infos_faixa">
      <img id="capa_album" src="https://m.media-amazon.com/images/I/71VApfdR6lL._AC_SX425_.jpg">

      <div class="player-display">
          <span id="nome_artista" style="text-shadow: 0px 0px 3px black !important;">Van Halen</span><br>
          <span id="nome_faixa" style="text-shadow: 0px 0px 3px black !important; filter: drop-shadow(0px 0px 15px black);">Jump</span>
      </div>
  </div>

  <div class="jp-playlist-player">
        <div class="top-bar">
            <div class="container">
                <div class="player-controls">
                    <a href="#" class="icon_control" id="jplayer_repeat"><i class="icn_ctrl fa-2x fas fa-redo-alt icons_secundarios status_repeteco"></i></a>
                    <a href="#" class="icon_control" id="jplayer_anterior"><i class="icn_ctrl fa-2x fas fa-fast-backward"></i></a>
                    <a href="#" class="icon_control" id="jplayer_play"><i class="icn_ctrl fa-2x fas fa-play-circle"></i></a>
                    <a href="#" class="icon_control" id="jplayer_pause"><i class="icn_ctrl fa-2x fas fa-pause-circle"></i></a>
                    <a href="#" class="icon_control" id="jplayer_proximo"><i class="icn_ctrl fa-2x fas fa-fast-forward"></i></a>
                    <a href="#" class="icon_control" id="jplayer_random"><i class="icn_ctrl fa-2x fas fa-random icons_secundarios status_random"></i></a>
                </div>

                <div id="opcs_progress" class="player-timeline">
                    <a href="#"><div id="jplayer_tempo_execucao" style="float: left;">00:00</div></a>
                    <a href="#"><div id="barra_progresso" class="player-timeline-control" onclick="altera_tempo_tocado()"><div id="progress_bar"></div></div></a>
                    <a href="#"><div id="jplayer_tempo_total" style="float: right;">00:00</div></a>
                </div>

                <div class="volume_control">
                    <i class="fas fa-volume-down fa-2x" onclick="desliga_som()"></i>
                    <div id="jplayer_volume_bar" class="jp-volume-bar">
                        <div id="jplayer_volume_bar_value" class="jp-volume-bar-value"></div>
                    </div>
                </div>

                <i class="fa-2x fas fa-cog" id="btn_abrir_configuracoes"></i>

                <i class="fa-2x fas fa-arrow-left" id="btn_mostrar_playlist"></i>
            </div>
        </div>
    </div>

    <div id="fundo_capa"></div>
    
    
    <!-- Modal para inserir novo -->
    <b-modal id="modal-novo-item" title="Novo Artista" hide-footer>
      <b-overlay :show="show" rounded="sm">
        <b-form v-on:submit="createNewArtista">
          <label class="mr-sm-2" for="input-patrimonio">Nome do artista:</label>
          <b-form-input
            id="input-patrimonio"
            v-model="novoArtista.nome"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Ex: Banda Dejavu"
          ></b-form-input>

          <label class="mr-sm-2" for="input-responsavel">Seguidores:</label>
          <b-form-input
            v-model="novoArtista.seguidores"
            id="input-responsavel"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Seguidores"
          ></b-form-input>

          <label class="mr-sm-2" for="input-responsavel">URL da foto:</label>
          <b-form-input
            v-model="novoArtista.foto"
            id="input-responsavel"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Foto do artista"
          ></b-form-input>
          
          <b-button type="submit" variant="primary" @click="show = !show">Criar</b-button>
          <b-button type="reset" variant="danger">Limpar</b-button>
        </b-form>
      </b-overlay>
    </b-modal>
    
    <div id="bg_stromus">
      <div class="invent-cards" v-if="inicioView">        
          <div id="pagina_inicial">
            <h1 class="titulo_pag" id="time_set"></h1>
            <div id="play_recomendados"></div>
        </div>
      </div>

      <!-- Tabela do iventário -->
      <div class="invent-table" v-if="artistaView" id="lista_artistas">

        <b-button v-b-modal.modal-novo-item variant="dark">Adicionar um artista</b-button>

        <b-nav-form>
          <b-form-input
            size="sm"
            v-model="artistaSearch"
            class="sr-sm-3"
            placeholder="Buscar artista"
          ></b-form-input>
        </b-nav-form>

        <b-table id="items-table" borderless thead-class="d-none" fixed
                :per-page="perPage" 
                :current-page="currentPage" 
                v-bind:items="filterSearch">

              <template #cell(foto)="cellData">
                  <img id="foto_artista" v-bind:src=cellData.item.foto >
              </template>

              <template #cell(nome)="cellData">
                  <h1 class='nome_artista'>{{cellData.item.nome}}</h1>
                  <b-button v-on:click="removeSelectedArtista(cellData.item.nome)">Excluir artista</b-button>
              </template>

              <template #cell(seguidores)="cellData2">
                  <p class='seguidores_artista'>{{cellData2.item.seguidores}} seguidores</p>
              </template>

              <template>
              </template>
        </b-table>
      </div>

    </div>
  </div>
</template>

<script>
import CardArtista from '../components/CardArtista.vue'

export default {
  //Executado quando a instância do Vue estiver construída
  async asyncData({ $axios }) {
    let artistas, totalRows;
    try {
      const response = await $axios.$get('artista');
      artistas = response;
      
      totalRows = artistas.length;
    } catch (ex) {
      console.log(ex);
    }

    return { artistas, totalRows }
  },
  components: { CardArtista },
  name: 'IndexPage',
  data: function () {
      return {                
        show: false,
        inicioView: true,
        tableView: false,
        artistaView: false,
        cardView: false,

        artistaSearch: "",
        currentPage: 1,
        totalRows: 0,
        perPage: 5,
        url: '',
        artistas: [],
        novoArtista: {
          foto: "",
          nome: "",
          seguidores: 0
        },
    };
  },

  methods: {
    createNewArtista: function (event) {
      event.preventDefault();
      console.log(JSON.stringify(this.novoArtista));
      // A instância do axios disponível no Nuxt.js é acessível
      // por this.$axios.
      // Veja mais sobre em https://axios.nuxtjs.org/usage
      this.$axios
        .$post("artista", this.novoArtista)
        .then((response) => {
          console.log('Resposta do servidor obtida');
          // Acessa o objeto que controla os modais e esconde aquele que você passar o id.
          this.$bvModal.hide('modal-novo-item');
          this.show = false;
          this.updateArtista();
        })
        .catch((error) => {
          console.error('Não foi possível criar um novo artista');
          console.log(error);
          this.$bvModal.hide('modal-novo-item');
          this.show = false;
        });
    },

    updateArtista: function () {
      // A instância do axios disponível no Nuxt.js é acessível
      // por this.$axios.
      // Veja mais sobre em https://axios.nuxtjs.org/usage
      this.$axios.$get("artista").then((response) => {
        this.artistas = response;
        this.totalRows = this.artistas.length

        console.log(this.artistas.length);
      })
    },

    removeSelectedArtista: function (nome) {
      // A instância do axios disponível no Nuxt.js é acessível
      // por this.$axios.
      // Veja mais sobre em https://axios.nuxtjs.org/usage
      this.$axios.$delete(`artista/${nome}`).then((response) => {
        let msg = response;
        
        this.updateArtista();
      })      
    },
  },

  computed: {
    filterSearch: function () {
      console.log("Termo de busca:" + this.artistaSearch);
      if (this.artistaSearch.length > 0) {
        return this.artistas.filter((artista) => 
          artista.nome.toLowerCase().includes(this.artistaSearch.toLowerCase())
        )
      } else {
        return this.artistas
      }
    },
  },
}
</script>

<style scoped>
  @import '../static/style.css';

    .invent-table {
        padding: 0 100px;
        margin: 0 auto;
    }

    .invent-cards {
        padding: 0px 100px;
        margin: 20px auto;
    }
</style>
