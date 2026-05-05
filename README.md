# HRnet React

HRnet est une application de gestion des ressources humaines permettant de créer, consulter et gérer les employés d’une entreprise. Cette version est une réécriture moderne en React, remplaçant l’ancien plugin jQuery par des composants réutilisables et performants.

## Fonctionnalités

- Création d’un nouvel employé via un formulaire dynamique
- Liste des employés avec recherche, tri et pagination

## Stack technique

- React 18+
- Vite
- Context API pour la gestion d’état
- CSS Modules

## Installation du projet

```bash
git clone https://github.com/ManueGI/hr-net-react.git
cd hr-net-react
npm install
npm run dev
```

## Composant principal : DataTable

L’application utilise le composant réutilisable `data-table-component-gif` pour afficher la liste des employés avec tri, recherche et pagination. Ce composant est publié sur npm et peut être intégré dans d’autres projets React.

### Installation du composant

```bash
npm install data-table-component-gif
```

### Exemple d’utilisation

```js
import DataTable from "data-table-component-gif";

<DataTable data={employees} columns={columns} />;
```

Plus d’informations et documentation complète sur [npm](https://www.npmjs.com/package/data-table-component-gif).
