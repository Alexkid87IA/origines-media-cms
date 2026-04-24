import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'
import ArticlePreview from './components/ArticlePreview'

const UNIVERS = [
  { id: 'esprit', title: "L'Esprit", icon: '🧠' },
  { id: 'corps', title: 'Le Corps', icon: '💪' },
  { id: 'liens', title: 'Les Liens', icon: '🤝' },
  { id: 'monde', title: 'Le Monde', icon: '🌍' },
  { id: 'avenir', title: "L'Avenir", icon: '🚀' },
]

export default defineConfig({
  name: 'default',
  title: 'Origines Media',

  projectId: 'r941i081',
  dataset: 'production',

  plugins: [
    structureTool({
      defaultDocumentNode: (S, { schemaType }) => {
        if (schemaType === 'production') {
          return S.document().views([
            S.view.form(),
            S.view.component(ArticlePreview).title('Preview'),
          ])
        }
        return S.document()
      },
      structure: (S) =>
        S.list()
          .title('Origines Media')
          .items([
            // --- Articles par univers ---
            S.listItem()
              .title('Articles')
              .icon(() => '📝')
              .child(
                S.list()
                  .title('Articles par univers')
                  .items([
                    S.listItem()
                      .title('Tous les articles')
                      .icon(() => '📋')
                      .child(
                        S.documentTypeList('production')
                          .title('Tous les articles')
                          .defaultOrdering([{ field: 'datePublication', direction: 'desc' }])
                      ),
                    S.divider(),
                    ...UNIVERS.map((u) =>
                      S.listItem()
                        .title(u.title)
                        .icon(() => u.icon)
                        .child(
                          S.documentTypeList('production')
                            .title(`Articles — ${u.title}`)
                            .filter('_type == "production" && univpilar == $univers')
                            .params({ univers: u.id })
                            .defaultOrdering([{ field: 'datePublication', direction: 'desc' }])
                        )
                    ),
                    S.divider(),
                    S.listItem()
                      .title('⚠️ Sans univers')
                      .child(
                        S.documentTypeList('production')
                          .title('Articles sans univers')
                          .filter('_type == "production" && !defined(univpilar)')
                      ),
                  ])
              ),

            // --- Portraits (histoires) ---
            S.listItem()
              .title('Portraits')
              .icon(() => '👤')
              .child(
                S.documentTypeList('production')
                  .title('Portraits / Histoires')
                  .filter('_type == "production" && category == "portraits"')
                  .defaultOrdering([{ field: 'datePublication', direction: 'desc' }])
              ),

            // --- Vidéos ---
            S.listItem()
              .title('Vidéos')
              .icon(() => '🎬')
              .child(
                S.list()
                  .title('Vidéos par univers')
                  .items([
                    S.listItem()
                      .title('Toutes les vidéos')
                      .icon(() => '📋')
                      .child(
                        S.documentTypeList('production')
                          .title('Toutes les vidéos')
                          .filter('_type == "production" && rubrique == "videos"')
                          .defaultOrdering([{ field: 'datePublication', direction: 'desc' }])
                      ),
                    S.divider(),
                    ...UNIVERS.map((u) =>
                      S.listItem()
                        .title(u.title)
                        .icon(() => u.icon)
                        .child(
                          S.documentTypeList('production')
                            .title(`Vidéos — ${u.title}`)
                            .filter('_type == "production" && rubrique == "videos" && univpilar == $univers')
                            .params({ univers: u.id })
                            .defaultOrdering([{ field: 'datePublication', direction: 'desc' }])
                        )
                    ),
                  ])
              ),

            // --- Recommandations ---
            S.listItem()
              .title('Recommandations')
              .icon(() => '⭐')
              .child(
                S.documentTypeList('production')
                  .title('Recommandations')
                  .filter('_type == "production" && rubrique == "collections"')
                  .defaultOrdering([{ field: 'datePublication', direction: 'desc' }])
              ),

            S.divider(),

            // --- Équipe ---
            S.listItem()
              .title('Auteurs')
              .icon(() => '✍️')
              .child(S.documentTypeList('author').title('Auteurs')),

            S.listItem()
              .title('Équipe')
              .icon(() => '👥')
              .child(S.documentTypeList('teamMember').title('Membres de l\'équipe')),

            // --- Tags ---
            S.listItem()
              .title('Tags')
              .icon(() => '🏷️')
              .child(S.documentTypeList('tag').title('Tags')),

            S.divider(),

            // --- Paramètres ---
            S.listItem()
              .title('Paramètres du site')
              .icon(() => '⚙️')
              .child(S.documentTypeList('siteSettings').title('Paramètres')),

            // --- Legacy (pour visualisation) ---
            S.listItem()
              .title('Legacy — Verticales')
              .icon(() => '🗂️')
              .child(S.documentTypeList('verticale').title('Verticales (ancien modèle)')),

            S.listItem()
              .title('Legacy — Univers (sous-cat)')
              .icon(() => '🗂️')
              .child(S.documentTypeList('univers').title('Univers (ancien modèle)')),
          ])
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
