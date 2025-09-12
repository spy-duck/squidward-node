import { createZodDto } from 'nestjs-zod';
import { NodeHealthContract } from '@contract/commands/node/node-health.contract';


export class NodeHealthDto extends createZodDto(NodeHealthContract.ResponseSchema) {}