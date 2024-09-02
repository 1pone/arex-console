import { Heading } from '@/components/heading'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/table'
import { queryMember } from '../actions'
import AddMember from './add-member'
import RemoveMember from './remove-member'

export default async function Member() {
  const members = await queryMember()
  return (
    <div>
      <div className="flex justify-between">
        <Heading>Member</Heading>
        <AddMember />
      </div>
      <Table className="mt-4 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Email</TableHeader>
            <TableHeader>Action</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((email) => (
            <TableRow key={email}>
              <TableCell>{email}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <RemoveMember email={email} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
