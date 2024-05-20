import React from 'react';

const ProfileDetail = () => {
    return (
        <div >
        <fieldset className="info-group-compte">
       <legend>Statistiques Globales</legend>
        
   
         <p className='details-items-info'><span className='items-contient-info'>Nombre total d'individus masculins :</span> </p>
         <p className='details-items-info'><span className='items-contient-info'>Nombre total d'individus féminins :</span> </p>
         <p className='details-items-info'><span className='items-contient-info'>Nombre total d'hommes inscrits :</span> </p>
         <p className='details-items-info'><span className='items-contient-info'>Nombre total d'hommes non inscrits :</span> </p>
         <p className='details-items-info'><span className='items-contient-info'>Nombre total de femmes inscrites :</span> </p>
         <p className='details-items-info'><span className='items-contient-info'>Nombre total de femmes non inscrites :</span> </p>
   
         </fieldset>
         </div>
    );
};

export default ProfileDetail;