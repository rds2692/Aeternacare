import path from 'node:path';
import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const SKILL_DIR = 'C:/Users/Admin/.codex/plugins/cache/openai-primary-runtime/presentations/26.1020.11127/skills/presentations';
const workspaceDir = 'C:/Users/Admin/Documents/AeternaCare/aeterna-web';
const candidatePath = path.join(workspaceDir, '.codex-build/aeterna-plan-captacion-draft.pptx');
const finalPath = path.join(workspaceDir, 'entregables/aeterna-propuesta-captacion-cliente-90-dias.pptx');
const stagingDir = path.join(workspaceDir, '.codex-finalizer');
await fs.mkdir(stagingDir, { recursive: true });
await fs.mkdir(path.dirname(finalPath), { recursive: true });
const { finalizePresentation } = await import(pathToFileURL(path.join(SKILL_DIR, 'container_tools/artifact_tool_utils.mjs')).href);
const result = await finalizePresentation({
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe',
  integrityValidatorPath: path.join(SKILL_DIR, 'container_tools/inspect_presentation_package_integrity.py'),
  layoutValidatorPath: path.join(SKILL_DIR, 'container_tools/inspect_presentation_layout_geometry.py'),
  layoutArgs: ['--expected-slide-size-emu', '12192000,6858000', '--validate-bullet-geometry', '--validate-heading-fit'],
  requiredNativeTableOwnerSlides: [],
  fontPolicy: { basis: 'design', families: ['Aptos'] },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, 'aeterna-propuesta-captacion-cliente-90-dias.validation.json'),
});
console.log(JSON.stringify(result, null, 2));
