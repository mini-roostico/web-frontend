import { GraphData } from '@/commons/graph.ts'

/**
 * Configuration of the suite.
 * @property pairs the pairs of key-value that define the configuration.
 */
export interface Configuration {
  pairs: { key: string; value: string }[]
}

/**
 * Parameter of the suite.
 * @property name the name of the parameter.
 * @property values the values of the parameter.
 */
export interface Parameter {
  name: string
  values: string[]
}

/**
 * Macro declared in the suite.
 * @property name the name of the macro.
 * @property values the values of the macro.
 */
export interface Macro {
  name: string
  values: string[]
}

/**
 * Subject contained inside the suite.
 * @property name the name of the subject.
 * @property pairs the pairs of key-value that define the subject.
 */
export interface Subject {
  name: string
  pairs: { key: string; value: string }[]
}

/**
 * Main entity of Subjekt. It can parsed by Subjekt to generate results.
 * @property name the name of the suite.
 * @property configuration the configuration of the suite.
 * @property parameters the parameters of the suite.
 * @property macros the macros of the suite.
 * @property subjects the subjects of the suite.
 */
export interface Suite {
  name: string
  configuration: Configuration
  parameters: Parameter[]
  macros: Macro[]
  subjects: Subject[]
}

/**
 * Source of the suite.
 * @property id the unique identifier of the source.
 * @property name the name of the source.
 * @property lastModified the last modification date of the source.
 * @property yaml the YAML content of the source.
 */
export interface Source {
  id: string
  name: string
  lastModified: Date
  yaml: string
}

/**
 * Resolved subject, obtained from resolving a subject in the suite.
 * @property name the name of the subject.
 * @property values the values of the subject.
 */
export interface ResolvedSubject {
  name: string
  values: { key: string; value: string }[]
}

/**
 * Result of the generation of the suite.
 * @property generationGraph the graph of the generation.
 * @property result the resolved subjects of the suite.
 */
export interface GenerationResult {
  generationGraph: GraphData
  result: ResolvedSubject[]
}
