const fields = {
    header: document.getElementById("header"),
    headerNavigation: document.getElementById("header-navigation"),
    headerMenu: document.getElementById("header-menu"),
    headerItems: document.getElementById("header-items"),
    contentSchedule: document.getElementById("schedule-items"),
    loadingSchedule: document.getElementById("schedule-loading"),
}
 window.addEventListener("scroll", () => {
    const currentPositionScroll = window.pageYOffset;
    fields.header.classList.toggle("header--show", currentPositionScroll > 150)
 })

 function onOpenMenu() {
    const isCloseMenu = !fields.headerNavigation.classList.contains("header__navigation--open");
    fields.headerNavigation.classList.toggle("header__navigation--open", isCloseMenu);
    fields.headerMenu.classList.toggle("header__menu--active", isCloseMenu);
    fields.headerItems.classList.toggle("header__items--open", isCloseMenu);
 }

 function onCloseMenu() {
    const isOpenMenu = fields.headerNavigation.classList.contains("header__navigation--open");
    if(isOpenMenu) {
        fields.headerNavigation.classList.remove("header__navigation--open");
        fields.headerNavigation.classList.remove("header__navigation--open");
        fields.headerMenu.classList.remove("header__menu--active");
        fields.headerItems.classList.remove("header__items--open");
    }
 }

 function renderProfilePhoto(speakers) {
   return speakers?.slice(0,1)?.map(({name, photo}) => {
      const profilePhoto = photo ?? "src/assets/without.jpg"
      return  `
            <img
               class="schedule-item__photo"
               src="${profilePhoto}"
               alt="foto de perfil de ${name}"
            />
            <p class="schedule-item__name">${name}</p>
         `
      }
   ) 
   
 }

 function renderDetailsDate(all_dates) {
   return all_dates?.map(({date, start_time, end_time}) => (
      `
         ${date?.substring(8,10)}/10 de ${start_time} às ${end_time} <br>
      `
   )).join("") 
 }

 function renderSpeakers(speakers) {
   const title = speakers?.length > 1 ? 'Palestrantes' : 'Palestrante';
   return `
      <div class="schedule-item__double">
            <label class="schedule-item__indicator">${title}</label>
            <p class="schedule-item__text">
            ${speakers?.map(({name}) => (
               `
                  ${name} <br>
               `
            )).join("")}
            </p>
      </div>
   `
 }

 function renderSessions(sessions) {
   return sessions?.map(({title, description, venue, speakers, all_dates}) => (
      `
      <div class="schedule-item box__shadow">
             <div class="schedule-item__profile">
             ${renderProfilePhoto(speakers)}               
             </div>
             <div class="schedule-item__infos">
                 <div>
                     <label class="schedule-item__indicator">Título</label>
                     <h3 class="schedule-item__title">${title}</h3>
                 </div>
                 <div>
                     <label class="schedule-item__indicator">Descrição</label>
                     <p class="schedule-item__text">
                         ${description}
                     </p>
                 </div>
                 <div>
                     <label class="schedule-item__indicator">Local</label>
                     <p class="schedule-item__text">
                         ${venue}
                     </p>
                 </div>
                 <div class="schedule-item__tow">
                     ${renderSpeakers(speakers)}
                     <div class="schedule-item__double">
                         <label class="schedule-item__indicator">Programação detalhada</label>
                         <p class="schedule-item__text">
                           ${renderDetailsDate(all_dates)}
                         </p>
                     </div>
                 </div>
             </div>
         </div>
      `
     )).join("")
 }

 function renderItemsSchedule(data) {
   fields.contentSchedule.innerHTML = data?.map(({ date, day, sessions }) => (
      `
         <div class="schedule-items__date box__shadow">
            <img
               src="src/assets/diary.jpg"
               alt="depois vejo" 
               class="schedule-items__image"
            >
            <div class="schedule-items__numbers">
               <p class="schedule-items__day">${date.substring(8,10)}</p>
               <p class="schedule-items__month"><strong>Outubro'</strong> 2022</p>
               <p class="schedule-items__name">${day.charAt(0).toUpperCase() + day.slice(1)}</p>
            </div>
         </div>
         ${renderSessions(sessions)}
      `
   )).join("")
 }

 function onRequestSchedule() {
   renderItemsSchedule(datas);
   fields.loadingSchedule.classList.add("schedule-loading--hidden")
   fields.contentSchedule.classList.remove("schedule-items--hidden")
 }

 window.onload = () => {
   onRequestSchedule();
 };

 