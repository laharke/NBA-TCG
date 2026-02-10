class NBACard extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
    }
  
    connectedCallback() {
      const number = this.getAttribute('number') || '0';
      const name = this.getAttribute('name') || 'Unknown';
      const rarity = this.getAttribute('rarity') || 'common';
      const holo = this.getAttribute('holo') != null ? 'holo' : '';
      const image = this.getAttribute('image');
      const teamLogo = this.getAttribute('team-logo');

      const border1 = this.getAttribute('border1');
      const border2 = this.getAttribute('border2');
      this.shadowRoot.innerHTML = `
        <style>
       /* ===== BASE CARD ===== */

          .nba-card {
            width: 240px;
            height: 340px;
            padding: 8px;
            border-radius: 16px;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
          }

          /* ===== RARITIES ===== */

          .nba-card {
            background: linear-gradient(135deg, ${border1}, ${border2});
          }


          .common { box-shadow: 0 0 20px 7px  #aaa; }
          .rare { box-shadow: 0 0 20px 7px  #2168db; }
          .epic { box-shadow: 0 0 20px 7px #b84cff;; }
          .legendary { box-shadow: 0 0 20px 7px  #c2a607; }


          .holo {
            position: absolute;
            inset: 0;
            pointer-events: none;
            z-index: 5;

            /* capa brillo */
            background:
              linear-gradient(
                115deg,
                transparent 20%,
                rgba(255,255,255,0.25) 35%,
                transparent 50%
              ),

              linear-gradient(
                45deg,
                rgba(255,0,255,0.15),
                rgba(0,255,255,0.15),
                rgba(255,255,0,0.15),
                rgba(255,0,255,0.15)
              );

            background-size: 200% 200%, 300% 300%;

            mix-blend-mode: screen;
            opacity: 0.75;

            animation: holoShift 8s linear infinite alternate;
          }

          /* movimiento foil */

          @keyframes holoShift {
            0% {
              background-position: -150% 0%, 0% 50%;
            }

            100% {
              background-position: 150% 0%, 100% 50%;
            }
          }


          /* ===== INNER FRAME ===== */

          .card-frame {
            position: relative;
            width: 100%;
            height: 100%;
            background: #111;
            border-radius: 12px;
            overflow: hidden;
          }

          /* ===== PLAYER IMAGE ===== */

          .player-img {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          /* ===== NUMBER ===== */

          .card-number {
            position: absolute;
            top: 8px;
            left: 10px;

            background: rgba(0,0,0,0.3);
            padding: 3px 6px;
            border-radius: 6px;

            color: white;
            font-size: 14px;
            font-weight: bold;
            z-index: 2;
          }

          /* ===== TEAM LOGO ===== */

          .team-logo {
            position: absolute;
            top: 8px;
            right: 8px;

            width: 36px;
            height: 36px;

            background: rgba(255,255,255,0.3);
            padding: 4px;
            border-radius: 8px;

            object-fit: contain;
            z-index: 2;
          }

          /* ===== NAME BAR ===== */

          .card-name {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;

            background: rgba(0,0,0,0.85);
            color: white;

            text-align: center;
            font-weight: bold;
            font-size: 14px;

            padding: 8px 6px;
            z-index: 2;
          }

          </style>

          <div class="nba-card ${rarity}">

              <div class="card-frame">
                <div class="${holo}"></div>

                <div class="card-number">#${number}</div>
            
                <img class="team-logo"
                  src="${teamLogo}"
                  alt="team">
            
                <img class="player-img"
                  src="${image}"
                  alt="player">
            
                <div class="card-name">
                  ${name}
                </div>
            
              </div>
            
            </div>
      `;
    }
  }
  
  customElements.define('nba-card', NBACard);
  